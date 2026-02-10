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
    href: "C:\Users\paulr\App Dev ACTIVITY\appdev\app\about\page.tsx",
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
  {
    id: "social",
    title: "DEVIANT ART",
    description: "",
    href: "https://www.deviantart.com/paulrupertmortel",
    image:
      "https://images.unsplash.com/photo-1506903536293-8419385acdce?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Gallery4 = ({
  title = "",
  description = "",
  items = data,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);

    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  return (
    <section className="relative flex min-h-screen items-start justify-center pt-16">
      <div className="w-full max-w-7xl px-4">
        {/* Header */}
        {(title || description) && (
          <div className="mb-10 flex justify-center text-center">
            <div className="max-w-xl">
              {title && (
                <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-3 text-muted-foreground">{description}</p>
              )}
            </div>
          </div>
        )}

        {/* Carousel */}
        <Carousel
          setApi={setCarouselApi}
          opts={{
            align: "center",
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="flex justify-center">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="flex justify-center px-3 md:basis-auto"
              >
                <a href={item.href} className="group block w-[320px] lg:w-[360px]">
                  <div className="relative h-[420px] overflow-hidden rounded-xl">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    <div className="absolute bottom-0 p-6 text-white">
                      <h3 className="mb-2 text-xl font-semibold">
                        {item.title}
                      </h3>

                      <div className="flex items-center text-sm">
                        Read more
                        <ArrowRight className="ml-2 size-5 transition-transform group-hover:translate-x-1" />
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
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index
                  ? "bg-primary"
                  : "bg-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
