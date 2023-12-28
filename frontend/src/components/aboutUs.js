import React from "react";
import "../styling/aboutUs.css";

export const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="div">
        <div className="group">
          <img className="frame" alt="Frame1" src={"../assets/frame1.png"} />
          <p className="kostku-aplikasi">
            Kostku - Aplikasi Pencari Kos No. 1 di Surabaya
          </p>
          <p className="text-wrapper">
            Sejak didirikan pada 12 Desember 2023, Kostku telah berkembang hingga menjadi aplikasi pencari kos no. 1 di
            Surabaya.
          </p>
        </div>
        <div className="group-2">
          <p className="p">
            Kostku memberikan daftar kos dengan penjelasan terperinci, seperti lokasi, jumlah unit, harga, dan fasilitas
            utama yang tersedia.
          </p>
          <p className="text-wrapper-2">Informasi Data Kos Yang Lengkap</p>
          <img className="img" alt="Frame2" src="../assets/frame2.png" />
        </div>
        <div className="group-3">
          <p className="text-wrapper-3">
            Kostku akan terus berusaha untuk bisa memberikan data ketersediaan yang akurat dan lengkap agar calon penghuni kos
            mendapat kemudahan dalam mencari kos.
          </p>
          <div className="data-kos-seluruh">
            Data Kos Mencakup Seluruh Surabaya
          </div>
          <img className="frame2" alt="Frame3" src="../assets/frame3.png" />
        </div>
        <div className="overlap-group-wrapper">
          <div className="overlap-group">
            <div className="text-wrapper-4">Hubungi Kami:</div>
            <div className="group-4">
              <img className="instagram" alt="Instagram" src="../assets/instagram.png" />
              <img className="facebook" alt="Facebook" src="../assets/facebook.png" />
              <img className="whatsapp" alt="Whatsapp" src="../assets/whatsapp.png" />
            </div>
          </div>
        </div>
        <div className="komputer-wrapper">
          <img className="komputer" alt="Komputer" src="../assets/komputer.png" />
        </div>
      </div>
    </div>
  );
};

export default AboutUs