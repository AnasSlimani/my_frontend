import React from 'react';
import { FaCalendarAlt, FaCar, FaMoneyBillWave, FaTimes } from 'react-icons/fa';

const ReservationDetailsModal = ({ isOpen, onClose, details }) => {
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
            onClick={(handleDownloadPDF) => {
              // TODO: Implement PDF download
              alert('PDF download functionality will be implemented later');
            }}
          >
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailsModal;

