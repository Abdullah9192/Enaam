import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import offer1 from "../../Assets/offer1.png";
import offer2 from "../../Assets/offer2.png";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { OffersData } from "../../Atom";
import { calculateOfferEndDate, formatDate, GetWihoutHead } from "../../Utils/Utils";

const OfferCard = () => {
  const [offers, setOffers] = useRecoilState(OffersData);
  useEffect(() => {
    fetchOffers();
    // eslint-disable-next-line
  }, []);
  const fetchOffers = async () => {
    // console.log("Fetching Offers");
    if (offers && offers.length > 0) {
      console.log("Offers already fetched");
      return false;
    } else {
      try {
        let res = await GetWihoutHead("/offer");
        if (res) {
          console.log(res, "offers");
          setOffers(res.data.data);
        }
      } catch (err) {
        console.log(err, "error fetching offers");
      }
    }
    return;
  };
  return (
    <div className="container">
      <div className="row mt-3">
        {offers && offers.length > 0 ? (
          offers.map((offer, index) => (
            <div className="col-md-4 mt-4" key={index}>
              <div className="card offercard">
                <img
                  src={offer2}
                  className="img-fluid"
                  alt={offer.title || "Offer Image"}
                />
                <div className="offerDetails my-3 p-2">
                  <h2 className="title text-capitalize">{offer.title}</h2>
                  <p>
                    Starting Date:{" "}
                    <span className="date">{formatDate(offer.createdAt)}</span>
                  </p>
                  <p>
                    Ending Date:{" "}
                    <span className="date">{formatDate(calculateOfferEndDate(offer.createdAt,offer.originalDuration))}</span>
                  </p>
                  <hr />
                  <p className="description">{offer.description}</p>
                  <Button
                    variant="contained"
                    size="large"
                    className="btn-add-to-cart mt-3"
                    fullWidth
                    onClick={() =>
                      toast.success(`Offer Redeemed: ${offer.title}`, {
                        autoClose: 5000,
                        theme: "colored",
                      })
                    }
                  >
                    REDEEM
                  </Button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <img
              src={offer1}
              className="img-fluid"
              alt="No offers available"
            />
               <div className="text-center"><span class="loader1"></span></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;
