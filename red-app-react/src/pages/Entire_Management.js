import React,{useEffect,useState} from "react";
import { get_reddata } from "../components/Get_reddata";
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

export const Entire = () => {
    const [reddata,setReddata]=useState({});

    useEffect(()=>{
        const fetchreddata=async()=>{
            try{
                const result=await get_reddata();
                setReddata(result);
                // console.log(result);
            }catch(error){
                console.log(error);
            }
        };
        fetchreddata();
    },[reddata]);

    const [iplist,setIplist]=useState([]);
    useEffect(()=>{
      const ip=Object.keys(reddata).filter((key)=>key.includes("192.168"));
      setIplist(ip);
    },[reddata]);
    
    const [paramlist,setParamlist]=useState([]);
    useEffect(()=>{
        const nowparam=iplist.map(ip=>reddata[ip].param).filter(param => param !== undefined);
        const updateparam=[];
        nowparam.forEach(element=>{
            const found = updateparam.some(item => item === element);
            if(!found){
                updateparam.push(element);
            }
        });
        setParamlist(updateparam);
    },[reddata,iplist]);




    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
        




        return(
            <div>
                <h1>**Swarm System Operation and Management(Entire)**</h1>
                <div>
                    <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    >
                        {paramlist.map((index)=>(
                            <Item>
                                Mu:{index.Mu}Sigma:{index.Sigma}Inner:{index.Inner_Rth}Outer:{index.Outer_Rth}Freq:{index.MarkerColor}
                                {iplist.map((ip)=>(
                                    reddata[ip].param===index  && <p key={ip}>{ip}</p>
                                ))}
                                <p>番号</p>
                            </Item>
                            
                        ))}
                        
                    </Stack>
                </div>
                {/* <p>{JSON.stringify(paramlist)}</p> */}
               
                
            </div>
            
        );
}
