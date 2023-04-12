import Image from "next/image";
import dev1 from "../../image/toey.png";
import dev2 from "../../image/fah.png";
import dev3 from "../../image/mu.png";
import dev4 from "../../image/yok.png";
import dev5 from "../../image/bright.png";
import github from "../../image/github.png";
import linkin from "../../image/linkin.png";
function Footer() {
  const images = [dev1, dev2, dev3, dev4, dev5];
  const devName = ["Toey", "Fah", "Mu", "Yok", "Bright"];

  return (
    <div className="w-full flex flex-col items-center bg-white-secondary px-[50px] min-[768px]:px-[120px] py-[64px]">
      <h3 className="text-pink-tertiary text-center" id="heading3">Meet the team</h3>
      <div className="flex flex-wrap border-b-[1px] border-[red] justify-center">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col  items-center p-[3rem]">
            <Image src={image} alt={`team-member-${index}`} className="mb-10 w-[180px]" />
            <h5 className="mb-10" id="heading5">{devName[index]}</h5>
            <div className="flex gap-10">
              <Image src={github} />
              <Image src={linkin} />
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-10" id="subtitle2">
        © 2021 - Get That Job
      </h2>
    </div>
  );
}

export default Footer;
