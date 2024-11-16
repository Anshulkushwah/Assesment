import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import Card from './Card';
import axios from 'axios';
import DetailCard from "./DetailCard"


const Home = () => {

    const [AllData, setAllData] = useState([]);
    const [click, setClick] = useState(false);
    const  [clickId, setClickId] = useState("");

    const getresponse = async () =>{
        try{
            const res = await axios.get("http://localhost:4000/api/v1/products");
            setAllData(res.data.data);
            

        }catch(e){
                console.log("Erooorrrrr", e);
        }
    }
    console.log(AllData.data);
    useEffect(()=>{
        getresponse();
    },[])

  return (
    <div  >
        <Navbar />{
            click ? 
            (<div>
                    <DetailCard className="h-[100%]" clickId={clickId} />
            </div>)
             :
            (<div className="min-h-screen bg-gray-100">
                <div className='w-11/12 mx-auto flex flex-wrap justify-center items-center gap-4 py-8'>
                        {AllData.length > 0 ? (
                            AllData.map((item)=>(
                                <Card 
                                key={item._id} 
                                image={item.image}
                                title={item.name}
                                description={item.description}
                                price={item.price}
                                brand={item.brand}
                                setClick = {setClick}
                                setClickId = {setClickId}
                                id={item._id}
                                />
                            ))
                            ) : (
                                <p>Loading...</p>
                            )
                        }
                </div>
            </div>)
            }
    </div>
    
  );
}

export default Home;
