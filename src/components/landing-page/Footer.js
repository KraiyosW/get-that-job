import Image from "next/image";
import dev1 from "../../image/toey.png";
import dev2 from "../../image/fah.png";
import dev3 from "../../image/mu.png";
import dev4 from "../../image/yok.png";
import dev5 from "../../image/bright.png";
import github from "../../image/github.png";
import linkin from "../../image/linkin.png";
import Link from "next/link";

function Footer() {
  const images = [dev1, dev2, dev3, dev4, dev5];
  const devName = ["Toey", "Fah", "Mu", "Yok", "Bright"];
  const devFullName = ["Kraiyos Wanna", "Sudarad Thonglue", "Jittawat Vonglao", "Patiparn Wongsawang", "Vachirawit Linkanokrat"]
  const devGithub = [
    "https://github.com/KraiyosW",
    "https://github.com/FahSudarad",
    "https://github.com/muvonglao",
    "https://github.com/Yok-Patiparn",
    "https://github.com/22whiskey"
  ];
  const devLinkedIn = [
    "https://linkedin.com/in/kraiyos-wanna",
    "https://linkedin.com/in/sudarad-thonglue",
    "https://linkedin.com/in/jittawat-vonglao-033b5726a",
    "https://www.linkedin.com/in/patiparn-wongsawang-752381269/",
    "https://linkedin.com/in/brighttech"
  ];

  return (
    <div className="w-full flex flex-col items-center bg-white-secondary px-[50px] min-[768px]:px-[120px] py-[64px]">
      <h3 className="text-pink-tertiary text-center" id="heading3">Meet the team</h3>
      <div className="flex flex-wrap border-b-[1px] border-[red] justify-center">
        {images.map((image, index) => (
          <div key={index} className="flex flex-col items-center p-[3rem]">
            <Image src={image} alt={`team-member-${index}`} className="mb-10 w-[180px] duration-[0.5s] hover:translate-y-[-5px]" />
            <h5 id="heading5">{devName[index]}</h5>
            <h6 className="my-[15px] text-pink-tertiary tracking-[2px] text-center">{devFullName[index]}</h6>
            <div className="flex gap-10">

              <Link href={devGithub[index]}>
                <Image src={github} className="opacity-100 hover:opacity-50 transition duration-500" />

              </Link>
              <Link href={devLinkedIn[index]}>
                <Image src={linkin} className="opacity-100 hover:opacity-50 transition duration-500" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-10" id="subtitle2">
        © 2023 - Get That Job
      </h2>
    </div>
  );
}

export default Footer;
