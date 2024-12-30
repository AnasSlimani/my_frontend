import React, { useEffect, useState } from "react";
import SideBarAdmin from "./SideBarAdmin";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Pencil, Trash2 } from 'lucide-react';
import './GestionVehicules.css';

function GestionVehicules() {
  const [vehicules, setVehicules] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicules = async () => {
      try {
        const response = await fetch("http://localhost:8082/api/vehicules/allVehicules");
        const data = await response.json();
        setVehicules(data);
      } catch (err) {
        console.error("Erreur fetching vehicles:", err.message);
      }
    };

    fetchVehicules();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce véhicule ?")) {
      try {
        const response = await fetch(`http://localhost:8082/api/vehicules/deleteVehicule/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setVehicules((prevVehicules) =>
            prevVehicules.filter((vehicule) => vehicule.id !== id)
          );
          alert("Véhicule supprimé avec succès.");
        } else {
          alert("Erreur : Impossible de supprimer le véhicule.");
        }
      } catch (err) {
        console.error("Erreur lors de la suppression :", err.message);
        alert("Erreur de réseau ou serveur.");
      }
    }
  };

  const handleUpdate = (id) => {
    navigate(`/admin/vehicules/UpdateVehicule/${id}`);
  };

  return (
    <Container fluid className="min-h-screen bg-gray-50">
      <Row>
        <Col md={2} className="p-0">
          <SideBarAdmin />
        </Col>

        <Col md={10} className="p-0">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Gestion des Véhicules</h1>
              <Link
                to="/admin/vehicules/FormAddVehicle"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Ajouter un véhicule
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
              {vehicules.map((vehicule) => (
                <div key={vehicule.id} className="vehicle-card">
                  <div className="vehicle-content">
                    <div className="relative p-6">
                      <img
                        src={`http://localhost:8082${vehicule.imagepath}`}
                        alt={`${vehicule.marque} ${vehicule.modele}`}
                        className="w-full h-40 object-contain"
                      />
                    </div>

                    <div className="p-5">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">
                            {vehicule.marque}
                          </h3>
                          <p className="text-gray-600">{vehicule.modele}</p>
                        </div>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                          {vehicule.prix} DH
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex flex-col">
                            <span className="text-gray-500">Année</span>
                            <span className="font-medium text-gray-900">{vehicule.annee}</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500">Type</span>
                            <span className="font-medium text-gray-900">{vehicule.vehiculeType}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex flex-col">
                            <span className="text-gray-500">Disponible</span>
                            <span className="font-medium text-gray-900">{vehicule.quantite} unités</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-gray-500">Réservations</span>
                            <span className="font-medium text-gray-900">{vehicule.nbrReservateurs}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <span className="inline-block w-2 h-2 rounded-full mr-2 bg-green-500"></span>
                            <span className="text-sm text-gray-600">
                              {vehicule.maxCount} places
                            </span>
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            Available
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="vehicle-overlay">
                    <button
                      onClick={() => handleUpdate(vehicule.id)}
                      className="update-btn"
                    >
                      <Pencil className="w-5 h-5" />
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(vehicule.id)}
                      className="delete-btn"
                    >
                      <Trash2 className="w-5 h-5" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default GestionVehicules;

