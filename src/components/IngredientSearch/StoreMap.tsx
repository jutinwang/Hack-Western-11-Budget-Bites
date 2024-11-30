import React from "react";
import { MapPin, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { cn } from "@/lib/utils";

interface Store {
  id: string;
  name: string;
  distance: number;
  priceLevel: 1 | 2 | 3;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface StoreMapProps {
  stores?: Store[];
  selectedStore?: string;
  onStoreSelect?: (storeId: string) => void;
  className?: string;
}

const defaultCenter = {
  lat: 40.7128,
  lng: -74.006,
};

const mapContainerStyle = {
  width: "100%",
  height: "200px",
  borderRadius: "0.5rem",
};

const StoreMap = ({
  stores = [
    {
      id: "1",
      name: "Grocery Store A",
      distance: 0.5,
      priceLevel: 2,
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: "2",
      name: "Supermarket B",
      distance: 1.2,
      priceLevel: 1,
      coordinates: { lat: 40.7138, lng: -74.008 },
    },
    {
      id: "3",
      name: "Market C",
      distance: 0.8,
      priceLevel: 3,
      coordinates: { lat: 40.7118, lng: -74.004 },
    },
  ],
  selectedStore = "",
  onStoreSelect = () => {},
  className = "",
}: StoreMapProps) => {
  const [selectedMarker, setSelectedMarker] = React.useState<Store | null>(
    null,
  );

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      {
        featureType: "all",
        elementType: "all",
        stylers: [{ saturation: -100 }, { lightness: 50 }],
      },
    ],
  };

  const customMarkerIcon = {
    path: "M12 0C7.58 0 4 3.58 4 8c0 5.25 7 13 7 13s7-7.75 7-13c0-4.42-3.58-8-8-8z",
    fillColor: selectedStore ? "#df591f" : "#45bed4",
    fillOpacity: 1,
    strokeWeight: 1,
    strokeColor: "#ffffff",
    scale: 1.5,
  };

  return (
    <Card className={cn("w-full bg-background p-4", className)}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Nearby Stores</h3>
        <Badge variant="outline" className="text-sm">
          <MapPin className="h-3 w-3 mr-1" />
          {stores.length} stores found
        </Badge>
      </div>

      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ""}
      >
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={14}
          options={mapOptions}
        >
          {stores.map((store) => (
            <Marker
              key={store.id}
              position={store.coordinates}
              icon={customMarkerIcon}
              onClick={() => {
                setSelectedMarker(store);
                onStoreSelect(store.id);
              }}
            />
          ))}

          {selectedMarker && (
            <InfoWindow
              position={selectedMarker.coordinates}
              onCloseClick={() => setSelectedMarker(null)}
            >
              <div className="p-2">
                <p className="font-medium">{selectedMarker.name}</p>
                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    {Array.from({ length: selectedMarker.priceLevel }).map(
                      (_, i) => (
                        <DollarSign key={i} className="h-3 w-3" />
                      ),
                    )}
                  </div>
                  <span>·</span>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {selectedMarker.distance} mi
                  </div>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </Card>
  );
};

export default StoreMap;
