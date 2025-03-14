import React,{ useEffect } from 'react'
// import winners from "../../Assets/Data/LuckyDrawWinnersData"
import winnerframe from "../../Assets/winnerframe.png";
import { useRecoilState } from "recoil";
import { winnerData } from "../../Atom";
import { GetWihoutHead } from "../../Utils/Utils";
import imgSource from "../../Assets/Group.png";
const LuckyDrawWinners = () => {
  const [winners, setWinners] = useRecoilState(winnerData);
  useEffect(() => {
    fetchWinners();
    // eslint-disable-next-line
  }, []);
  
  const fetchWinners = async () => {
    // //console.log("Fetching Winners");
    if(winners && winners.length > 0){
      // //console.log("Winners already fetched");
      return;
    }else{
      try {
        let res = await GetWihoutHead("/winner/winner");
        if (res) {
          //console.log(res.data,"prepadas");
          setWinners(res.data.data);
        }
      } catch (err) {
        console.log(err, "error fetching winners");
      }
    }
    return;
  };
  return (
    <div className='container-fluid'>
        <h1 className='text-center mt-5'>Lucky Draw Winners</h1>
        <div className="row px-5">
            {winners.map((winner) => (
          <div key={winner.id} className="col-md-3 my-4">
             <div className="recent-winner text-center">
              <img
                src={imgSource}
                className="img-fluid winnerImg"
                alt=""
              />
              <div className="winner-frame">
                <img src={winnerframe} className="img-fluid" alt="" />
              </div>
              <div className="winner-detail mt-2">
                <p>{winner.name}</p>
                <span>{winner.prize}</span>
              </div>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}

export default LuckyDrawWinners