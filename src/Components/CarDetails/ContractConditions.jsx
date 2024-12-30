import React, { useState } from 'react';

const ContractConditions = ({ onAccept }) => {
  const [accepted, setAccepted] = useState(false);

  const handleAccept = () => {
    setAccepted(true);
    onAccept();
  };

  return (
    <div className="contract-conditions">
      <h3>Conditions du Contrat</h3>
      <p>1. Le véhicule doit être retourné dans le même état.</p>
      <p>2. Toute violation des règles entraînera des frais supplémentaires.</p>
      <p>3. La location ne couvre pas les dommages non signalés.</p>
      <button onClick={handleAccept} disabled={accepted}>
        {accepted ? 'Accepté' : 'Accepter les conditions'}
      </button>
    </div>
  );
};

export default ContractConditions;
