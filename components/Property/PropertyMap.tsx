"use client";

import { Property } from "@prisma/client";
import { useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker } from "react-map-gl";
import LoadingPage from "@/app/loading";
import Image from "next/image";
import pin from "@/asset/images/pin.svg";
import { useGeoCode } from "@/hooks";
type Props = {
  property: Property;
};

export default function PropertyMap({ property }: Props) {
  const [viewPort, setViewPort] = useState({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: "100%",
    height: "500px",
  });

  const propertyAddress = `${property.location.street} ${property.location.city} ${property.location.state} ${property.location.zipCode}`;

  const { lat, lng, loading } = useGeoCode(propertyAddress);
  console.log(lat, lng, loading);

  if (loading) return <LoadingPage loading={loading} />;

  return (
    !loading && (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        mapLib={import("mapbox-gl")}
        initialViewState={{
          longitude: lng,
          latitude: lat,
          zoom: 15,
        }}
        style={{
          width: "100%",
          height: 500,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        <Marker
          longitude={lng as number}
          latitude={lat as number}
          anchor="bottom"
        >
          <Image src={pin} alt="Location" width={40} height={40} />
        </Marker>
      </Map>
    )
  );
}
