import { Button } from "@/components/ui/button"
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeolocation } from "@/hooks/useGeolocation"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useReverseGeocodeQuery } from "@/hooks/useWeather";
const WeatherDashboard = () => {

  const {coordinates,
    error:locationError,
    getLocation,
    isLoading:loadingLocation,
  } = useGeolocation();


  const locationQuery = useReverseGeocodeQuery(coordinates);
  console.log(locationQuery);

  if(loadingLocation){
    return <WeatherSkeleton/>
  }
  if(locationError){
    return (
      <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Location Error</AlertTitle>
      <AlertDescription>
        <p>{locationError}</p>
        <Button onClick={getLocation}>
          <MapPin className="w-4 h-4 mr-2"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

  if(!coordinates){
    return (
      <Alert variant="destructive">
      <AlertTitle>Location Required</AlertTitle>
      <AlertDescription>
        <p>{locationError}</p>
        <Button onClick={getLocation}>
          <MapPin className="w-4 h-4 mr-2"/>
          Enable Location
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

  return (
    <div className="space-y-4">
      {/**Favourite Cities */}
       <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold tracking-tight">My Locations</h1>
           <Button variant={"outline"}
            size={"icon"}

           >
              <RefreshCw className="w-4 h-4"/>
           </Button>
       </div>
    </div>
  )
}

export default WeatherDashboard