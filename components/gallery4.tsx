"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items?: Gallery4Item[];
}

const data: Gallery4Item[] = [
  {
    id: "about",
    title: "ABOUT ME",
    description: "",
    href: "/about",
    image:
      "https://images.unsplash.com/photo-1662125208190-b21030e953ee?q=80&w=689&auto=format&fit=crop",
  },
  {
    id: "photo",
    title: "INSTAGRAM",
    description: "",
    href: "https://www.instagram.com/paulmortel/",
    image:
      "https://plus.unsplash.com/premium_photo-1761424387200-cfa34802fa04?q=80&w=1470&auto=format&fit=crop",
  },
];

const Gallery4 = ({
  title = "",
  description = "",
  items = data,
}: Gallery4Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section className="relative min-h-screen pt-16">
      <div className="mx-auto max-w-7xl px-4">
        {(title || description) && (
          <div className="mb-10 text-center">
            {title && (
              <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-3 text-muted-foreground">{description}</p>
            )}
          </div>
        )}

        <Carousel
          setApi={setApi}
          opts={{
            align: "start",
            breakpoints: {
              "(min-width: 1024px)": {
                align: "center",
              },
            },
          }}
        >
          <CarouselContent className="lg:justify-center">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="
                  basis-full
                  sm:basis-1/2
                  lg:basis-[360px]
                  flex justify-center
                  px-2
                "
              >
                <a href={item.href} className="block w-full max-w-[360px]">
                  <div className="relative h-[420px] overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="mb-2 text-xl font-semibold">
                        {item.title}
                      </h3>
                      <div className="flex items-center text-sm">
                        Read more
                        <ArrowRight className="ml-2 size-5 transition-transform hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                current === index ? "bg-primary" : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
