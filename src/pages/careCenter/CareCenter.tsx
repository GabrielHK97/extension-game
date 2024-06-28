import arara from "../../assets/arara.png";
import mico from "../../assets/mico.png";
import boto from "../../assets/boto.png";
import lobo from "../../assets/lobo.png";
import onca from "../../assets/onca.png";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function CareCenter() {
  const images = [arara, mico, boto, lobo, onca];
  const [name, setName] = useState<string | undefined>(undefined);
  const [animal, setAnimal] = useState<number | undefined>(undefined);
  const [hungryLevel, setHungryLevel] = useState<number>(0);
  const [thirstyLevel, setThirstyLevel] = useState<number>(0);
  const [loveLevel, setLoveLevel] = useState<number>(0);
  const navigate = useNavigate();

  function setupHungry() {
    const hungry = localStorage.getItem("hungry");
    if (!hungry) localStorage.setItem("hungry", new Date().toString());
    const hungryL = localStorage.getItem("hungryLevel");
    if (!hungryL) {
      const level = getRandomLevel();
      setHungryLevel(level);
      localStorage.setItem("hungryLevel", level.toString());
    } else {
      setHungryLevel(Number.parseInt(hungryL));
    }
  }

  function setHungry() {
    const hungry = localStorage.getItem("hungry");
    if (hungry) {
      if (differenceIn5Minutes(new Date(), new Date(hungry)))
        setHungryLevel(() => {
          const hungryL = localStorage.getItem("hungryLevel");
          const currentValue = Math.max(Number.parseInt(hungryL!) - 1, 0);
          localStorage.setItem("hungry", new Date().toString());
          localStorage.setItem("hungryLevel", currentValue.toString());
          return currentValue;
        });
    }
  }

  function upHungry() {
    setHungryLevel((previousValue) => {
      const currentValue = Math.min(4, previousValue + 1);
      if (previousValue + 1 <= 4)
        localStorage.setItem("hungry", new Date().toString());
      localStorage.setItem("hungryLevel", currentValue.toString());
      return currentValue;
    });
  }

  function setupThirsty() {
    const thirsty = localStorage.getItem("thirsty");
    if (!thirsty) localStorage.setItem("thirsty", new Date().toString());
    const thirstyL = localStorage.getItem("thirstyLevel");
    if (!thirstyL) {
      const level = getRandomLevel();
      setThirstyLevel(level);
      localStorage.setItem("thirstyLevel", level.toString());
    } else {
      setThirstyLevel(Number.parseInt(thirstyL));
    }
  }

  function setThirsty() {
    const thirsty = localStorage.getItem("thirsty");
    if (thirsty) {
      if (differenceIn5Minutes(new Date(), new Date(thirsty)))
        setThirstyLevel(() => {
          const thirstyL = localStorage.getItem("thirstyLevel");
          const currentValue = Math.max(Number.parseInt(thirstyL!) - 1, 0);
          localStorage.setItem("thirsty", new Date().toString());
          localStorage.setItem("thirstyLevel", currentValue.toString());
          return currentValue;
        });
    }
  }

  function upThirsty() {
    setThirstyLevel((previousValue) => {
      const currentValue = Math.min(4, previousValue + 1);
      if (previousValue + 1 <= 4)
        localStorage.setItem("thirsty", new Date().toString());
      localStorage.setItem("thirstyLevel", currentValue.toString());
      return currentValue;
    });
  }

  function setupLove() {
    const love = localStorage.getItem("love");
    if (!love) localStorage.setItem("love", new Date().toString());
    const loveL = localStorage.getItem("loveLevel");
    if (!loveL) {
      const level = getRandomLevel();
      setLoveLevel(level);
      localStorage.setItem("loveLevel", level.toString());
    } else {
      setLoveLevel(Number.parseInt(loveL));
    }
  }

  function setLove() {
    const love = localStorage.getItem("love");
    if (love) {
      if (differenceIn5Minutes(new Date(), new Date(love)))
        setLoveLevel(() => {
          const loveL = localStorage.getItem("loveLevel");
          const currentValue = Math.max(Number.parseInt(loveL!) - 1, 0);
          localStorage.setItem("love", new Date().toString());
          localStorage.setItem("loveLevel", currentValue.toString());
          return currentValue;
        });
    }
  }

  function upLove() {
    setLoveLevel((previousValue) => {
      const currentValue = Math.min(4, previousValue + 1);
      if (previousValue + 1 <= 4)
        localStorage.setItem("love", new Date().toString());
      localStorage.setItem("loveLevel", currentValue.toString());
      return currentValue;
    });
  }

  const differenceIn5Minutes = (date1: Date, date2: Date) => {
    const differenceInMilliseconds = Math.abs(
      date2.getTime() - date1.getTime()
    );
    return Math.floor(differenceInMilliseconds / (1000 * 3)) > 0;
  };

  function getRandomLevel() {
    return Math.floor(Math.random() * 4) + 1;
  }

  function startClock() {
    setHungry();
    setThirsty();
    setLove();
    const interval = setInterval(() => {
      setHungry();
      setThirsty();
      setLove();
    }, 1000);
    return () => clearInterval(interval);
  }

  function change() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    const name = localStorage.getItem("name");
    const animal = localStorage.getItem("animal");
    if (!name && !animal) navigate("/");
    if (name) setName(name);
    if (animal) setAnimal(Number.parseInt(animal));
    setupHungry();
    setupThirsty();
    setupLove();
    startClock();
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-row background">
      <div className="w-2/5 h-full p-10">
        <div className="w-full h-full bg-orange-100 p-5 rounded-xl shadow-lg border-2 border-orange-800 text-xl flex flex-col justify-start items-center gap-2 text-justify">
          <div className="text-3xl">{name}</div>
          <div className="rounded-xl overflow-hidden">
            <img src={images[animal ?? -1]} />
          </div>
          <div className="flex flex-col justify-center items-center w-full gap-2">
            <div className="w-full flex flex-row rounded-xl overflow-hidden bg-black p-1 gap-1">
              <div className="text-white flex justify-center items-center w-1/6 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-8 h-8"
                >
                  <path
                    fill="currentColor"
                    d="M61.1 224C45 224 32 211 32 194.9c0-1.9 .2-3.7 .6-5.6C37.9 168.3 78.8 32 256 32s218.1 136.3 223.4 157.3c.5 1.9 .6 3.7 .6 5.6c0 16.1-13 29.1-29.1 29.1H61.1zM144 128a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zm240 16a16 16 0 1 0 0-32 16 16 0 1 0 0 32zM272 96a16 16 0 1 0 -32 0 16 16 0 1 0 32 0zM16 304c0-26.5 21.5-48 48-48H448c26.5 0 48 21.5 48 48s-21.5 48-48 48H64c-26.5 0-48-21.5-48-48zm16 96c0-8.8 7.2-16 16-16H464c8.8 0 16 7.2 16 16v16c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V400z"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-row gap-1">
                {[...new Array(hungryLevel)].map((level) => {
                  return (
                    <div className="bg-yellow-500 w-1/4 h-12 rounded-lg"></div>
                  );
                })}
              </div>
              <button
                className="text-white flex justify-center items-center w-1/12 h-12"
                onClick={upHungry}
              >
                +
              </button>
            </div>
            <div className="w-full flex flex-row rounded-xl overflow-hidden bg-black p-1 gap-1">
              <div className="text-white flex justify-center items-center w-1/6 h-12">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="w-8 h-8"
                >
                  <path
                    fill="currentColor"
                    d="M32 32c-9.3 0-18.1 4-24.2 11.1S-1 59.4 .3 68.6l50 342.9c5.7 39.3 39.4 68.5 79.2 68.5h253c39.7 0 73.4-29.1 79.2-68.5l50-342.9c1.3-9.2-1.4-18.5-7.5-25.5S489.3 32 480 32H32zM87.7 224L69 96H443L424.3 224H87.7z"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-row gap-1">
                {[...new Array(thirstyLevel)].map((level) => {
                  return (
                    <div className="bg-cyan-500 w-1/4 h-12 rounded-lg"></div>
                  );
                })}
              </div>
              <button
                className="text-white flex justify-center items-center w-1/12 h-12"
                onClick={upThirsty}
              >
                +
              </button>
            </div>
            <div className="w-full flex flex-row rounded-xl overflow-hidden bg-black p-1 gap-1">
              <div className="text-white flex justify-center items-center w-1/6 h-12">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-8 w-8">
                  <path
                    fill="currentColor"
                    d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"
                  />
                </svg>
              </div>
              <div className="flex-grow flex flex-row gap-1">
                {[...new Array(loveLevel)].map((level) => {
                  return (
                    <div className="bg-rose-500 w-1/4 h-12 rounded-lg"></div>
                  );
                })}
              </div>
              <button
                className="text-white flex justify-center items-center w-1/12 h-12"
                onClick={upLove}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="background-image w-3/5 h-full">
        <button
          className="absolute top-2 right-2 rounded-xl bg-cyan-400 p-2 text-white"
          onClick={change}
        >
          Trocar!
        </button>
      </div>
    </div>
  );
}
