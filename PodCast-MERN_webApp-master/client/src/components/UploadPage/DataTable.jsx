import React, { useState } from "react";
import { format } from 'date-fns';
import axios from "axios";
import ConfirmationModal from "../commonComponents/ConfirmationModal";
import { useNavigate, useParams } from "react-router-dom";
import { config } from "../../config/config";
import { BACKEND_URL } from "../../config/constants";

const DataTable = ({ dataUploaded, onDelete }) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [deletingId, setDeletingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);



  const handleDeleteClick = (id) => {
    setDeletingId(id);
    setIsModalOpen(true);
  };



  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`${BACKEND_URL}/api/project/${projectId}/file/${deletingId}`,config);
      onDelete(deletingId); 
      setIsModalOpen(false); 
    } catch (error) {
      console.error("There was an error deleting the item!", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeletingId(null);
    setIsModalOpen(false); 
  };

  return (
    <div className="rounded-lg border-black border">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="border-b-2">
            <th className="py-2">Name</th>
            <th className="py-2">Uploaded Date & Time</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataUploaded.map((item) => {
            const formattedDate = item?.updatedAt
              ? format(new Date(item.updatedAt), "MMMM d, yyyy h:mm:ss a")
              : "N/A";
            return (
              <tr key={item?._id} className="border-b-2 text-center">
                <td className="py-2">{item?.fileName}</td>
                <td className="py-2">{formattedDate}</td>
                <td className="py-2">{item?.status}</td>
                <td className="flex justify-end">
                  <button
                    className="py-2 pr-3 border"
                    onClick={() =>
                      navigate(`/project/${projectId}/file/edit/${item?._id}`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    className="py-2 text-red-700 px-2 border mr-10"
                    onClick={() => handleDeleteClick(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <ConfirmationModal
        isOpen={isModalOpen}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      >
        Are you sure you want to delete this item?
      </ConfirmationModal>
    </div>
  );
};

export default DataTable;