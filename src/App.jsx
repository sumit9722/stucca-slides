import './App.css'
import Card from './Card'
import { useCallback, useEffect, useRef, useState } from 'react'
import InfoBox from './InfoBox';
import CardBack from './CardBack';
import {gsap} from 'gsap';

import dvm from "/assets/prateek.png";
import adp from "/assets/shreyansh.png";
import pcr from "/assets/aryan.png";
import controls from "/assets/jaiditya.png";
import recnacc from "/assets/rijul.png";
import spons from "/assets/shreeram.png";
import gensec from "/assets/aryankhorana.png";
import prez from "/assets/ahan.png"



export default function App() {

  const listOfStucaa = [
    {
      name : "Prateek Kashyap",
      depName : "Department of Visual Media",
      imgLink : dvm
    },
    {
      name : "Shreyansh Vanjani",
      depName : "Department of Art, Design and Publicity",
      imgLink : adp
    },
    {
      name : "Aryan Wadhwa",
      depName : "Department of Publications and Correspondence",
      imgLink : pcr

    },
    {
      name : "Jaiditya Singh",
      depName : "Department of Controls",
      imgLink : controls

    },
    {
      name : "Rijul Bassamboo",
      depName : "Department of Reception and Accommodation",
      imgLink: recnacc

    },
    {
      name : "Shreeram Verma",
      depName : "Department of Sponsorship and Marketing",
      imgLink : spons
    },
    {
      name : "Aryan Khorana",
      depName : "General Secretary, Students' Union",
      imgLink : gensec
    },
    {
      name : "Ahan Bansal",
      depName : "President, Students' Union",
      imgLink : prez

    }
  ];

  const [currIndex, setCurrIndex] = useState(1);
  const [checker, setChecker] = useState(true);
  const [degcheck, setDegcheck] = useState(true);
  const currIndexRef = useRef(currIndex);
  const checkerRef = useRef(checker);
  const currCard = useRef();
  const currFront = useRef();
  const currFrontText = useRef();
  const currFrontImage = useRef();



  const beforeanimation = (settingFunc, number) => {
    gsap.defaults({
      ease: "power2.inOut",
      duration:1,
    });
    
    var tl = gsap.timeline({defaults: {ease: "power2.inOut"}});
    tl.to(currCard.current,{
      width: '35.44vh',
    },0)
    tl.to(currCard.current, {
      rotateY: 180,
      onComplete : () => {
        settingFunc(number);
      }
    })
    
  }

  
  useEffect(() => {
    const preloadArray = [dvm, adp, pcr, controls, recnacc, spons, gensec, prez]

    for (let asset of preloadArray) {
      let img = new Image();
      img.src = asset;
    }

    gsap.defaults({
      ease: "power2.inOut",
      duration:1,
    });
    
    var tl = gsap.timeline({defaults: {ease: "power2.inOut"}});
    if(degcheck)
    {
      tl.to(currCard.current, {
        rotateY:0,
      });
    }
    else{
      tl.to(currCard.current, {
        rotateY:360,
      });
    }
    
    tl.to(currCard.current, {
      width: '80vw',
      delay: 0.3
    },0)
    setDegcheck(!degcheck);
  }, [currIndex]);

  useEffect(() => {
    currIndexRef.current = currIndex;
  }, [currIndex]);

  useEffect(() => {
    checkerRef.current = checker;
  }, [checker]);

  useEffect(() => {
    function changeData(e) {
      const number = Number(e.key); 
      console.log(e, number, currIndexRef.current);
      if(!isNaN(number) && (number >= 1 && number <= 8) && (number != currIndexRef.current && checkerRef.current)){
        setChecker(false);
        beforeanimation((number) => {
          setCurrIndex(number);
          setChecker(true);
        },number);
      }
      
    }

    window.addEventListener('keydown', changeData);

    return () => {
      window.removeEventListener('keydown', changeData);
    }
  },[])

  return (
    <>
      <div className="logo">
        <img src="assets/oasislogoNew.png" alt="osaislogo" className='oasislogo' />
      </div>
      <div ref={currCard} className="displaybody">
        <div className="backpart">
          <CardBack className="cardbacks"/>
        </div>
        <div ref={currFront} className="frontpart">
          <div ref={currFrontImage} className="imagebox">
            <Card imgLink = {listOfStucaa[currIndex-1].imgLink}/>
          </div>
          <div ref={currFrontText} className="infoboxdiv">
            <InfoBox  name = {listOfStucaa[currIndex-1].name} depName = {listOfStucaa[currIndex-1].depName}/>
          </div>
        </div>
      </div>
      <img src="assets/right.png" className ="bottom-right"/>
      <img src="assets/right.png" className ="bottom-left"/>
      
    </>
  )
}

