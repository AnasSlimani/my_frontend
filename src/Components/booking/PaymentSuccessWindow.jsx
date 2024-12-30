import React from 'react';

const PaymentSuccessWindow = ({ onClose, startDate, carDetails }) => {
  const handleDownloadPDF = () => {
    // TODO: Implement PDF generation and download
    console.log("Downloading PDF...");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black ">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Paiement réussi</h2>
        <p className="mb-4">
          Votre paiement a été effectué avec succès. Veuillez vous rendre à l'agence pour récupérer votre véhicule le {new Date(startDate).toLocaleDateString()}.
        </p>
        <div className="flex justify-between">
          <button
            onClick={handleDownloadPDF}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Télécharger le PDF
          </button>
          <button
            onClick={onClose}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessWindow;

