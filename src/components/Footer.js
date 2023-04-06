import Image from "next/image"
import dev1 from '../image/dev1.png'
import dev2 from '../image/dev2.png'
import dev3 from '../image/dev3.png'
import dev4 from '../image/dev2.png'
import dev5 from '../image/dev1.png'
import github from '../image/github.png'
import linkin from '../image/linkin.png'
function Footer() {

    const images = [dev1, dev2, dev3, dev4, dev5];
    const devName = ['Toey', 'Fah', 'Mu', 'Yok', 'Bright'];

    return (
        <div className="w-full h-screen flex flex-col items-center">
            <h1>Meet the team</h1>
            <div className="flex flex-wrap">
                {images.map((image, index) => (
                    <div key={index} className="flex flex-col  items-center p-20">
                        <Image src={image} alt={`team-member-${index}`} className="mb-10" />
                        <p className="mb-10">{devName[index]}</p>
                        <div className="flex gap-10">
                            <Image src={github} />
                            <Image src={linkin} />
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}

export default Footer
