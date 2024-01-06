import React, { useState, useEffect } from 'react';
import NavbarOwner from "./NavbarOwner";
import { useUser } from '../UserContext';
import '../styling/ListKostOwner.css';

const Kostmu = () => {
  const [listKost, setListKost] = useState([]);
  const { userId } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newKostData, setNewKostData] = useState({
    nama: '',
    deskripsi: '',
    fasilitas: '',
    jenis: '',
    foto: '',
    alamat: '',
    harga: '',
    kategori: '',
    jarak: '',
  });
  const [editKostId, setEditKostId] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/kost/all/owner/${userId}`)
      .then(response => response.json())
      .then(data => setListKost(data.data))
      .catch(error => console.error('Error fetching Kost:', error));
  }, [userId]);

  const handleToggleModal = (kostId) => {
    if (kostId) {
      // If kostId is provided, it means we are editing, so fetch kost details
      fetch(`http://localhost:3001/api/kost/detail/${kostId}`)
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            const editedKost = data.data;
            setNewKostData({
              nama: editedKost.nama,
              deskripsi: editedKost.deskripsi,
              fasilitas: editedKost.fasilitas,
              jenis: editedKost.id_jenis.toString(), // Convert to string if needed
              foto: editedKost.foto,
              alamat: editedKost.alamat,
              harga: editedKost.Harga,
              kategori: editedKost.id_kategori.toString(), // Convert to string if needed
              jarak: editedKost.jarak,
            });
            setEditKostId(kostId);
            setIsModalOpen(true);
          } else {
            alert(`Gagal mendapatkan detail Kost. Error: ${data.message}`);
          }
        })
        .catch(error => {
          console.error('Error fetching Kost details:', error);
          alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    } else {
      // If kostId is not provided, it means we are adding a new Kost
      setEditKostId(null);
      setNewKostData({
        nama: '',
        deskripsi: '',
        fasilitas: '',
        jenis: '', // Set to the default value or an empty string
        foto: '',
        alamat: '',
        harga: '',
        kategori: '', // Set to the default value or an empty string
        jarak: '',
      });
      setIsModalOpen(!isModalOpen);
    }
  };
  

  const handleSaveKost = () => {
    if (editKostId) {
      // If editKostId is present, update the Kost
      handleUpdateKost();
    } else {
      // If editKostId is not present, add a new Kost
      handleAddKost();
    }
  };

  const handleAddKost = () => {
    const formData = {
      id_pemilik: userId,
      nama: newKostData.nama,
      deskripsi: newKostData.deskripsi,
      fasilitas: newKostData.fasilitas,
      jenis: newKostData.jenis,
      foto: newKostData.foto,
      alamat: newKostData.alamat,
      harga: newKostData.harga,
      kategori: newKostData.kategori,
      jarak: newKostData.jarak,
    };
    console.log(formData)

    fetch('http://localhost:3001/api/kost/add-kost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setIsModalOpen(false);
          setNewKostData({
            nama: '',
            deskripsi: '',
            fasilitas: '',
            jenis: '',
            foto: '',
            alamat: '',
            harga: '',
            kategori: '',
            jarak: '',
          });
          // Refetch the list of Kosts after successful addition
          fetchKostsForUser(userId);
        } else {
          alert(`Gagal menambahkan Kost. Error: ${data.message}`);
        }
      })
      .catch(error => {
        console.error('Error adding Kost:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
  };

  const handleUpdateKost = () => {
    const formData = {
      id_pemilik: userId,
      nama: newKostData.nama,
      deskripsi: newKostData.deskripsi,
      fasilitas: newKostData.fasilitas,
      jenis: newKostData.jenis,
      foto: newKostData.foto,
      alamat: newKostData.alamat,
      harga: newKostData.harga,
      kategori: newKostData.kategori,
      jarak: newKostData.jarak,
    };

    fetch(`http://localhost:3001/api/kost/update-kost/${editKostId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        if (data.status) {
          setIsModalOpen(false);
          setEditKostId(null);
          setNewKostData({
            nama: '',
            deskripsi: '',
            fasilitas: '',
            jenis: '',
            foto: '',
            alamat: '',
            harga: '',
            kategori: '',
            jarak: '',
          });
          // Refetch the list of Kosts after successful addition
          fetchKostsForUser(userId);
        } else {
          alert(`Gagal mengupdate Kost. Error: ${data.message}`);
        }
      })
      .catch(error => {
        console.error('Error updating Kost:', error);
        alert('Terjadi kesalahan. Silakan coba lagi.');
      });
  };

  const fetchKostsForUser = (userId) => {
    fetch(`http://localhost:3001/api/kost/all/owner/${userId}`)
      .then(response => response.json())
      .then(data => setListKost(data.data))
      .catch(error => console.error('Error fetching Kost:', error));
  };

  const handleDeleteKost = (kostId) => {
    const confirmDelete = window.confirm('Apakah Anda yakin ingin menghapus Kost ini?');
    if (confirmDelete) {
      // Implementasi penghapusan Kost di sini
      fetch(`http://localhost:3001/api/kost/delete-kost/${kostId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(data => {
          if (data.status) {
            // Hapus Kost dari state atau lakukan refetch data Kost
            fetchKostsForUser(userId);
          } else {
            alert(`Gagal menghapus Kost. Error: ${data.message}`);
          }
        })
        .catch(error => {
          console.error('Error deleting Kost:', error);
          alert('Terjadi kesalahan. Silakan coba lagi.');
        });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavbarOwner />
      <div className="container">
        <h2 className="heading">Daftar Kost Anda</h2>
        {listKost.length === 0 ? (
          <p className="italic-text">Tidak ada data kost.</p>
        ) : (
          <ul className="list">
            {listKost.map(kost => (
              <li key={kost.id} className="card">
                <img src={kost.foto} alt={kost.nama} className="image" />
                <div className="content">
                  <h3 className="name">{kost.nama}</h3>
                  <p>{kost.deskripsi}</p>
                  <p className="bold-text">Fasilitas: {kost.fasilitas}</p>
                  <p className="bold-text">Jenis: {kost.jenis}</p>
                  <p className="bold-text">Alamat: {kost.alamat}</p>
                  <p className="bold-text">Harga: {kost.harga} / {kost.kategori}</p>
                </div>
                <div className="action-buttons">
                  <button onClick={() => handleToggleModal(kost.id)} className="button edit-button">Edit</button>
                  <button onClick={() => handleDeleteKost(kost.id)} className="button delete-button">Hapus</button>
                </div>
              </li>
            ))}
          </ul>
        )}

        <button onClick={() => handleToggleModal()} className="button add-button">Tambah Kost</button>
      </div>

      {isModalOpen && (
        <div className="modal" style={{ display: 'block' }}>
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h3>{editKostId ? 'Edit' : 'Tambah'} Kost</h3>
            <form>
              <label htmlFor="nama">Nama Kost:</label>
              <input type="text" id="nama" name="nama" value={newKostData.nama} onChange={(e) => setNewKostData({ ...newKostData, nama: e.target.value })} />

              <label htmlFor="deskripsi">Deskripsi:</label>
              <textarea id="deskripsi" name="deskripsi" value={newKostData.deskripsi} onChange={(e) => setNewKostData({ ...newKostData, deskripsi: e.target.value })} />

              <label htmlFor="fasilitas">Fasilitas:</label>
              <input type="text" id="fasilitas" name="fasilitas" value={newKostData.fasilitas} onChange={(e) => setNewKostData({ ...newKostData, fasilitas: e.target.value })} />

              <label htmlFor="jenis">Jenis:</label>
              <select
                id="jenis"
                name="jenis"
                value={newKostData.jenis}
                onChange={(e) => setNewKostData((prevData) => ({ ...prevData, jenis: e.target.value }))}
              >
                <option value="1">Laki-laki</option>
                <option value="2">Wanita</option>
                <option value="3">Campuran</option>
              </select>



              <label htmlFor="foto">URL Foto:</label>
              <input type="text" id="foto" name="foto" value={newKostData.foto} onChange={(e) => setNewKostData({ ...newKostData, foto: e.target.value })} />

              <label htmlFor="alamat">Alamat:</label>
              <input type="text" id="alamat" name="alamat" value={newKostData.alamat} onChange={(e) => setNewKostData({ ...newKostData, alamat: e.target.value })} />

              <label htmlFor="kategori">Kategori:</label>
              <select
                id="kategori"
                name="kategori"
                value={newKostData.kategori}
                onChange={(e) => setNewKostData((prevData) => ({ ...prevData, kategori: e.target.value }))}
              >
                <option value="1">Bulan</option>
                <option value="2">Hari</option>
                <option value="3">Minggu</option>
              </select>


              <label htmlFor="jarak">Jarak:</label>
              <input type="text" id="jarak" name="jarak" value={newKostData.jarak} onChange={(e) => setNewKostData({ ...newKostData, jarak: e.target.value })} />

              <label htmlFor="harga">Harga:</label>
              <input type="text" id="harga" name="harga" value={newKostData.harga} onChange={(e) => setNewKostData({ ...newKostData, harga: e.target.value })} />

              <button type="button" onClick={handleSaveKost}>Simpan</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Kostmu;
