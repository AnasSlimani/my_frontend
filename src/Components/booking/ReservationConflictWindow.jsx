import React from 'react';

const ReservationConflictWindow = ({ onClose, endDate }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 text-black">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Réservation non disponible</h2>
        <p className="mb-4">
          Nous sommes désolés, mais ce véhicule est déjà réservé aux dates que vous avez choisies.
          Il sera disponible à partir du {new Date(endDate).toLocaleDateString()}.
        </p>
        <button
          onClick={onClose}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default ReservationConflictWindow;

