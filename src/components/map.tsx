import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// interface MapProps {
//   center: [number, number];
// }
import { MapProps } from "@/types";

export const Map: React.FC<MapProps> = ({ center = [51, -0.09] }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapInstanceRef.current) {
      // If the map already exists, set the view to the new center
      mapInstanceRef.current.setView(center);
    } else if (mapContainerRef.current) {
      // Initialize the map only once
      mapInstanceRef.current = L.map(mapContainerRef.current).setView(
        center,
        13
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(mapInstanceRef.current);
    }

    return () => {
      // Cleanup map instance on unmount
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [center]);

  return <div ref={mapContainerRef} className="h-[35vh] rounded-lg" />;
};

// "use client";

// import { useEffect, useRef } from "react";

// import L from "leaflet";
// import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";

// import "leaflet/dist/leaflet.css";
// import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerShadow from "leaflet/dist/images/marker-shadow.png";

// import { MapProps } from "@/types";

// //@ts-expect-error _getIconUrl exists
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconUrl: markerIcon.src,
//   iconRetinaUrl: markerIcon2x.src,
//   shadowUrl: markerShadow.src,
// });

// // Helper component to handle map centering dynamically
// const ChangeMapView = ({ center }: { center: L.LatLngExpression }) => {
//   const map = useMap();
//   if (center) {
//     map.setView(center, map.getZoom());
//   }
//   return null;
// };

// export const Map: React.FC<MapProps> = ({ center }) => {
//   const mapRef = useRef<L.Map | null>(null);

//   useEffect(() => {
//     if (!mapRef.current) {
//       mapRef.current = L.map("map").setView(center as L.LatLngExpression, 13);

//       L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//         attribution:
//           '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       }).addTo(mapRef.current);
//     }

//     // Cleanup function to destroy the map instance
//     return () => {
//       if (mapRef.current) {
//         mapRef.current.remove();
//         mapRef.current = null;
//       }
//     };
//   }, [center]);

//   return (
//     <MapContainer
//       center={(center as L.LatLngExpression) || [51, -0.09]}
//       zoom={center ? 6 : 2} //center ? 6 : 2
//       scrollWheelZoom={false}
//       className="h-[35vh] rounded-lg"
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {center && <Marker position={center as L.LatLngExpression} />}
//     </MapContainer>
//   );
// };
