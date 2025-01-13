import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaCar, FaMoneyBillWave, FaTimes } from 'react-icons/fa';
import jsPDF from "jspdf";
import logo from '../../images/car-logo.png';

const ReservationDetailsModal = ({ isOpen, onClose, details, user }) => {
  const [logoBase64, setLogoBase64] = useState('');

  useEffect(() => {
    const convertImageToBase64 = async () => {
      const response = await fetch(logo);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    };

    convertImageToBase64().then(setLogoBase64);
  }, []);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Add background color to header
    doc.setFillColor(245, 247, 250);
    doc.rect(0, 0, doc.internal.pageSize.width, 100, 'F');

    // Add company logo
    if (logoBase64) {
      const logoWidth = 40;
      const logoHeight = 40;
      const pageWidth = doc.internal.pageSize.width;
      const logoX = (pageWidth - logoWidth) / 2;
      doc.addImage(logoBase64, "PNG", logoX, 15, logoWidth, logoHeight);
    }

    // Add decorative elements
    doc.setDrawColor(66, 99, 235);
    doc.setLineWidth(2);
    doc.line(20, 65, 190, 65);

    // Add title
    doc.setFontSize(24);
    doc.setTextColor(33, 33, 33);
    doc.setFont("helvetica", "bold");
    const pageWidth = doc.internal.pageSize.width;
    doc.text("RENTAL AGREEMENT", pageWidth / 2, 80, { align: "center" });
    doc.setFontSize(20);
    doc.text("AND RESERVATION CONFIRMATION", pageWidth / 2, 90, { align: "center" });

    // Add reference number
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(66, 99, 235);
    const refNumber = generateReferenceNumber();
    doc.text(`Reference Number: ${refNumber}`, 20, 110);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 120);

    // Add main content
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(11);
    const content = `This Rental Agreement ("Agreement") is entered into between CarRental Company, located at 123 Anywhere St., Any City ("the Company"), and ${user.firstName} ${user.lastName} ("the Renter").

By this agreement, the Company agrees to rent to the Renter a ${details.marque} ${details.modele}, for the period from ${new Date(details.dateDebut).toLocaleDateString()} to ${new Date(details.dateFin).toLocaleDateString()}, at a daily rate of ${details.priceCar} DHS, with a total rental amount of ${details.montant} DHS.

The rental includes comprehensive insurance with standard coverage, subject to a deductible payable by the Renter in case of damage. The Renter agrees to maintain the vehicle in the same condition as received, comply with all traffic laws, and return the vehicle with the same fuel level.

Any violations, damages, or excessive cleaning requirements will result in additional charges as per the Company's current rates. This agreement is subject to early termination by the Company in case of violation of its terms, with all rental fees remaining due and payable.`;
    const splitContent = doc.splitTextToSize(content, 170);
    doc.text(splitContent, 20, 140);

    // Add signatures
    const signatureY = 220;
    doc.setFillColor(249, 250, 251);
    doc.setDrawColor(66, 99, 235);
    doc.setLineWidth(0.1);

    // Renter signature
    doc.roundedRect(20, signatureY, 75, 40, 3, 3, 'FD');
    doc.setFontSize(10);
    doc.setTextColor(66, 99, 235);
    doc.text("Renter:", 25, signatureY + 10);
    doc.setTextColor(51, 51, 51);
    doc.text(`${user.firstName} ${user.lastName}`, 25, signatureY + 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 25, signatureY + 30);

    // Company signature
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(110, signatureY, 75, 40, 3, 3, 'FD');
    doc.setTextColor(66, 99, 235);
    doc.text("Company Representative:", 115, signatureY + 10);
    doc.setTextColor(51, 51, 51);
    doc.text("Anas Slimani", 115, signatureY + 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 115, signatureY + 30);

    // Footer
    const footerY = doc.internal.pageSize.height - 20;
    doc.setDrawColor(66, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(20, footerY - 5, 190, footerY - 5);
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text("WHEELS Company • 123 Anywhere St., KHOURIBGA", pageWidth / 2, footerY, { align: "center" });
    doc.text("Tel: +212 670623901 • Email: bziyati11@gmail.com", pageWidth / 2, footerY + 5, { align: "center" });

    doc.save(`rental_agreement_${refNumber}.pdf`);
  };

  const generateReferenceNumber = () => {
    return 'CF' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <FaTimes size={24} />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Reservation Details</h2>
          <div className="h-1 w-20 bg-red-500"></div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-red-100 rounded-lg">
              <FaCar className="text-red-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Vehicle</p>
              <p className="font-semibold text-gray-800">{details?.marque} {details?.modele}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaCalendarAlt className="text-blue-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rental Period</p>
              <p className="font-semibold text-gray-800">
                From: {details?.dateDebut}<br />
                To: {details?.dateFin}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaMoneyBillWave className="text-green-500 text-xl" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Payment Details</p>
              <p className="font-semibold text-gray-800">{details?.montant} DH</p>
              <p className="text-sm text-gray-500">Paid on: {details?.datePaiment}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsModal;
