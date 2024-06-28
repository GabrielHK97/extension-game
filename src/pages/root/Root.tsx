import "./Root.css";
import arara from "../../assets/arara.png";
import mico from "../../assets/mico.png";
import boto from "../../assets/boto.png";
import lobo from "../../assets/lobo.png";
import onca from "../../assets/onca.png";
import Carousel from "../../components/carousel/Carousel";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Root() {
  const [name, setName] = useState<string | undefined>(undefined);
  const animalRef = useRef<string>("");
  const navigate = useNavigate();

  function storeAnimal() {
    if (name) {
      localStorage.setItem("name", name ?? "");
      localStorage.setItem("animal", animalRef.current);
      navigate("/carecenter");
    }
  }

  function getAnimal(animal: string) {
    animalRef.current = animal;
  }

  useEffect(() => {
    const name = localStorage.getItem("name");
    const animal = localStorage.getItem("animal");
    if (name && animal) navigate("/carecenter");
  }, []);

  return (
    <div className="w-screen h-screen flex justify-center items-center flex-row background">
      <div className="w-2/5 h-full p-10">
        <div className="w-full h-full bg-orange-100 p-5 rounded-xl shadow-lg border-2 border-orange-800 text-xl flex flex-col justify-start items-center gap-2 text-justify">
          <div>
            Bem-vindo ao Zoológico Cafofo das espécies! Como novo funcionário do
            nosso time, você tem uma tarefa muito importante pela frente: cuidar
            de um animal em extinção. Hoje, você pode escolher entre cinco
            espécies fascinantes que precisam do seu cuidado especial:
          </div>
          <Carousel
            className="w-full h-full"
            images={[arara, mico, boto, lobo, onca]}
            animal={getAnimal}
          />

          <label className="w-full justify-center items-center flex flex-col gap-2">
            Escolha o nome do animal:
            <input
              type="text"
              className={`p-1 w-full max-w-96 rounded-xl ${name === "" ? ' border-2 border-red-500 ' : ''}`}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </label>
          <div>
            Sua dedicação pode fazer a diferença na preservação dessas espécies
            ameaçadas!
          </div>
          <button
            type="submit"
            className="rounded-xl bg-cyan-400 p-2 text-white"
            onClick={storeAnimal}
          >
            Cuidar!
          </button>
        </div>
      </div>
      <div className="background-image w-3/5 h-full"></div>
    </div>
  );
}
