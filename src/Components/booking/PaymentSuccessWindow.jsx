import React, { useEffect, useState } from 'react';
import jsPDF from "jspdf";
import logo from '../../images/car-logo.png';

const PaymentSuccessWindow = ({ onClose, startDate, carDetails, endDate ,user}) => {
  const [logoBase64, setLogoBase64] = useState('');

  useEffect(() => {
    // Convert image to base64 when component mounts
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
    
    // Add title with enhanced styling
    doc.setFontSize(24);
    doc.setTextColor(33, 33, 33);
    doc.setFont("helvetica", "bold");
    const pageWidth = doc.internal.pageSize.width;
    doc.text("RENTAL AGREEMENT", pageWidth / 2, 80, { align: "center" });
    doc.setFontSize(20);
    doc.text("AND RESERVATION CONFIRMATION", pageWidth / 2, 90, { align: "center" });
    
    // Add reference number with accent color
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(66, 99, 235);
    const refNumber = generateReferenceNumber();
    doc.text(`Reference Number: ${refNumber}`, 20, 110);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 120);
    
    // Add main content with improved formatting
    doc.setTextColor(51, 51, 51);
    doc.setFontSize(11);
    const content = `This Rental Agreement ("Agreement") is entered into between CarRental Company, located at 123 Anywhere St., Any City ("the Company"), and ${user.firstName} ${user.lastName} ("the Renter"), residing at ${carDetails.utilisateur?.address || 'N/A'}.

By this agreement, the Company agrees to rent to the Renter a ${carDetails.marque} ${carDetails.modele}, Year ${carDetails.annee}, for the period from ${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}, at a daily rate of ${carDetails.prix} DHS, with a total rental amount of ${calculateTotalAmount(startDate, endDate, carDetails.prix)} DHS.

The rental includes comprehensive insurance with standard coverage, subject to a deductible payable by the Renter in case of damage. The Renter agrees to maintain the vehicle in the same condition as received, comply with all traffic laws, and return the vehicle with the same fuel level.

Any violations, damages, or excessive cleaning requirements will result in additional charges as per the Company's current rates. This agreement is subject to early termination by the Company in case of violation of its terms, with all rental fees remaining due and payable.`;

    const splitContent = doc.splitTextToSize(content, 170);
    doc.text(splitContent, 20, 140);

    // Add styled boxes for signatures
    const signatureY = 220;
    
    // Add decorative boxes with gradient effect
    doc.setFillColor(249, 250, 251);
    doc.setDrawColor(66, 99, 235);
    doc.setLineWidth(0.1);
    
    // Renter signature box
    doc.roundedRect(20, signatureY, 75, 40, 3, 3, 'FD');
    doc.setFontSize(10);
    doc.setTextColor(66, 99, 235);
    doc.text("Renter:", 25, signatureY + 10);
    doc.setTextColor(51, 51, 51);
    doc.text(`${user.firstName} ${user.lastName}`, 25, signatureY + 20);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 25, signatureY + 30);

    // Company signature box
    // Set the background color to white
doc.setFillColor(255, 255, 255); // RGB for white
doc.roundedRect(110, signatureY, 75, 40, 3, 3, 'FD');

// Set text color for the heading
doc.setTextColor(66, 99, 235);
doc.text("Company Representative:", 115, signatureY + 10);

// Set text color for the representative name and date
doc.setTextColor(51, 51, 51);
doc.text("Anas Slimani", 115, signatureY + 20);
doc.text(`Date: ${new Date().toLocaleDateString()}`, 115, signatureY + 30);


    // Add footer with styling
    const footerY = doc.internal.pageSize.height - 20;
    doc.setDrawColor(66, 99, 235);
    doc.setLineWidth(0.5);
    doc.line(20, footerY - 5, 190, footerY - 5);
    
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text("WHEELS Company • 123 Anywhere St., KHOURIBGA", pageWidth / 2, footerY, { align: "center" });
    doc.text("Tel: +212 670623901 • Email: bziyati11@gmail.com", pageWidth / 2, footerY + 5, { align: "center" });

    // Save the PDF
    doc.save(`rental_agreement_${refNumber}.pdf`);
  };

  const generateReferenceNumber = () => {
    return 'CF' + Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const calculateTotalAmount = (startDate, endDate, dailyRate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    return days * dailyRate;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-blue-600">Paiement réussi</h2>
        <p className="mb-4">
          Votre paiement a été effectué avec succès. Veuillez vous rendre à l'agence pour récupérer votre véhicule le {new Date(startDate).toLocaleDateString()}.
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors duration-200"
          >
            Télécharger le PDF
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessWindow;

