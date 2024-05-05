import Image from "next/image";

type Props = {
  images: string[];
};

export default function PropertyImages({ images }: Props) {
  return (
    <section className="bg-blue-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt="property image"
            className="object-cover h-[400px] mx-auto rounded-xl"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div
                key={i}
                className={`${
                  images.length === 3 && i === 2 ? "col-span-2" : "col-span-1"
                }`}
              >
                <Image
                  src={img}
                  alt="property image"
                  className="object-cover h-[400px] w-full rounded-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
