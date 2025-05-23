import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../axios.js";
import Config from "../urlConf.js";
import { useTranslation } from "react-i18next";
import KonutListingForm from "./KonutListingForm.jsx";
import Modal from "react-modal";
import ArsaListingForm from "./ArsaListingForm.jsx";
import IsYeriListingForm from "./IsYeriListingForm.jsx";

// Modal'ın kök elemanını tanımla
Modal.setAppElement("#root");

const AccountMyPropertyTab = () => {
  const navigate = useNavigate();
  const storedUser = localStorage.getItem("user");
  const userData = JSON.parse(storedUser);
  const [data, setData] = useState([]);
  const [state, setState] = useState(null);
  let control = false;
  const [isOpen, setIsOpen] = useState(false);
  const [editIlanData, seteditIlanData] = useState(0);

  const { t } = useTranslation();

  const getData = async () => {
    await axios.get("/user/" + userData.id + "/ilans").then((res) => {
      setData(res.data);
      control = true;
    });
  };

  const DeleteKonut = async (id) => {
    await axios.delete("/konut/" + id).then((res) => {
      console.log(res);
      getData();
    });
  };

  const DeleteArsa = async (id) => {
    await axios.delete("/arsa/" + id).then((res) => {
      console.log(res);
      getData();
    });
  };

  const DeleteIsYeri = async (id) => {
    await axios.delete("/is_yeri/" + id).then((res) => {
      console.log(res);
      getData();
    });
  };

  const activePassive = async (id, kategori) => {
    if (kategori === "Konut") {
      await axios.put("/konut/" + id + "/ap").then((res) => {
        console.log(res);
        getData();
      });
    } else if (kategori === "Arsa") {
      await axios.put("/arsa/" + id + "/ap").then((res) => {
        console.log(res);
        getData();
      });
    } else if (kategori === "İş Yeri") {
      await axios.put("/is_yeri/" + id + "/ap").then((res) => {
        console.log(res);
        getData();
      });
    }
  };

  useEffect(() => {
    if (!storedUser) {
      navigate("/login");
    } else {
      if (!userData) {
        navigate("/login");
      }
    }
    getData();
  }, [navigate]);

  if (!userData) return null;

  if (data && data.ilans === 0 && control) {
    return <h1>{t("Yükleniyor Lütfen Bekleyiniz")}</h1>;
  }

  function formatDateToDayMonthYear(dateString) {
    const dateObj = new Date(dateString);

    // Gün, Ay, Yıl alımı
    const day = String(dateObj.getDate()).padStart(2, "0"); // Gün: 2 haneli olacak
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Ay: 2 haneli olacak, +1 çünkü getMonth() 0'dan başlar
    const year = dateObj.getFullYear(); // Yıl: 4 haneli

    // "gün-ay-yıl" formatında döndür
    return `${day}-${month}-${year}`;
  }

  function formatCurrency(amount) {
    // String'i sayıya çevirme
    const numericAmount = parseFloat(amount);

    // Sayıyı para birimi formatında döndürme
    return numericAmount.toLocaleString("tr-TR", {
      style: "currency",
      currency: "TRY",
    });
  }

  const tableData = ({ propertyTables, kategori }) => {
    if (!propertyTables || propertyTables.length === 0) {
      return (
        <tr>
          <td colSpan="5">{kategori} - Veri yok</td>
        </tr>
      ); // Eğer propertyTables boşsa
    }
    return propertyTables.map((propertyTable, propertyTableIndex) => (
      <>
        <tr key={propertyTableIndex}>
          <td>
            <div className="d-flex align-items-center gap-3">
              <div className="cart-item__thumb">
                <img
                  src={
                    propertyTable?.ilanable?.photos[0]?.path
                      ? `${Config.BASE_URL}/Image/${propertyTable.ilanable.photos[0].path}`
                      : `${Config.BASE_URL}/Image/no-image.png`
                  }
                  alt="property"
                />
              </div>
              <div className="cart-item__content">
                <h6 className="cart-item__title fw-500 font-18">
                  {propertyTable.ilanable.ilan_basligi}
                </h6>
                <p className="property-item__location d-flex gap-2 font-14">
                  <span className="icon text-gradient">
                    <i className="fas fa-map-marker-alt"></i>
                  </span>
                  {propertyTable?.ilanable?.İl}, {propertyTable?.ilanable?.İlçe}{" "}
                  {", "}
                  {propertyTable?.ilanable?.Mahalle}
                </p>
                <span className="cart-item__price">
                  Price:{" "}
                  <span className="fw-500 text-heading">
                    {formatCurrency(propertyTable?.ilanable?.fiyat)}
                  </span>
                </span>
              </div>
            </div>
          </td>
          <td>
            <span className="date">
              {formatDateToDayMonthYear(propertyTable?.ilanable?.created_at)}
            </span>
          </td>
          <td>
            <button
              type="button"
              onClick={() => {
                seteditIlanData(propertyTable?.ilanable);
                setIsOpen(true);
              }}
              className="rounded-btn edit-btn text-info bg-info m-auto bg-opacity-10 flex-shrink-0"
            >
              <i className="fas fa-edit"></i>
            </button>
          </td>
          <td>
            {propertyTable?.ilanable?.is_active == 1 ? (
              <button
                type="button"
                onClick={() => {
                  activePassive(propertyTable.ilanable.id, kategori);
                }}
                className="rounded-btn edit-btn text-danger bg-info m-auto bg-opacity-10 flex-shrink-0"
              >
                <i className="fas fa-times"></i>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  activePassive(propertyTable.ilanable.id, kategori);
                }}
                className="rounded-btn edit-btn text-info bg-info m-auto bg-opacity-10 flex-shrink-0"
              >
                <i className="fas fa-check"></i>
              </button>
            )}
          </td>
          <td>
            <button
              type="button"
              className="rounded-btn delete-btn text-danger bg-danger bg-opacity-10 flex-shrink-0"
              onClick={() => {
                if (kategori === "Konut") {
                  DeleteKonut(propertyTable.ilanable.id);
                } else if (kategori === "Arsa") {
                  DeleteArsa(propertyTable.ilanable.id);
                } else if (kategori === "İş Yeri") {
                  DeleteIsYeri(propertyTable.ilanable.id);
                }
              }}
            >
              <i className="fas fa-trash-alt"></i>
            </button>
          </td>
        </tr>
      </>
    ));
  };

  return (
    <>
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(1)}
            className="btn btn-main w-100"
          >
            {t("Konut")}
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(2)}
            className="btn btn-main w-100"
          >
            {t("Arsa")}
          </button>
        </div>
        <div className="col-md-4">
          <button
            type="button"
            onClick={() => setState(3)}
            className="btn btn-main w-100"
          >
            {t("İş Yeri")}
          </button>
        </div>
      </div>
      {state != null && (
        <>
          <div className="overflow-auto">
            <div className="card common-card min-w-maxContent">
              <div className="card-body">
                <table className="table style-two">
                  <thead>
                    <tr>
                      <th>{t("İlanlarım")}</th>
                      <th>{t("Eklenme Tarihi")}</th>
                      <th>{t("Aksiyon")}</th>
                      <th>{t("Aktif / Pasif")}</th>
                      <th>{t("Sil")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {state == 1 &&
                      tableData({
                        propertyTables: data?.ilans?.konut,
                        kategori: "Konut",
                      })}
                    {state == 2 &&
                      tableData({
                        propertyTables: data?.ilans?.arsa,
                        kategori: "Arsa",
                      })}
                    {state == 3 &&
                      tableData({
                        propertyTables: data?.ilans?.is_yeri,
                        kategori: "İş Yeri",
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
      {/* <Pagination /> */}

      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        contentLabel="Güncelleme Modal"
        style={{
          overlay: {
            zIndex: 1000, // Arka planın z-index değeri
            backgroundColor: "rgba(0, 0, 0, 0.75)", // Arkaplan rengi
          },
        }}
      >
        <div className="row">
          <button
            style={{ display: "flex", justifyContent: "right" }}
            onClick={() => setIsOpen(false)}
          >
            Kapat
          </button>
        </div>
        {state == 1 ? (
          <KonutListingForm editIlanData={editIlanData} />
        ) : state == 2 ? (
          <ArsaListingForm editIlanData={editIlanData} />
        ) : (
          <IsYeriListingForm editIlanData={editIlanData} />
        )}
      </Modal>
    </>
  );
};

export default AccountMyPropertyTab;
