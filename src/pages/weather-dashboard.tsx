import { Button } from "@/components/ui/button"
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useGeolocation } from "@/hooks/useGeolocation"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/useWeather";
import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
const WeatherDashboard = () => {

  const {coordinates,
    error:locationError,
    getLocation,
    isLoading:loadingLocation,
  } = useGeolocation();


  const locationQuery = useReverseGeocodeQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);
  const weatherQuery = useWeatherQuery(coordinates);


  const handleRefresh = ()=>{
    getLocation();

    if(coordinates){
      weatherQuery.refetch();
      locationQuery.refetch();
      forecastQuery.refetch();
    }
  }

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

  const locationName = locationQuery.data?.[0];

  if(weatherQuery.error || forecastQuery.error){
    return (
      <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>Failed to Fetch Weather Data Please Try Again</p>
        <Button onClick={getLocation}>
          <RefreshCw 
          onClick={handleRefresh}
           className="w-4 h-4 mr-2"/>
          Retry
        </Button>
      </AlertDescription>
    </Alert>
    )
  }

  if(!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton/>
  }
  

  return (
    <div className="space-y-4">
      {/**Favourite Cities */}
       <div className="flex items-center justify-between">
           <h1 className="text-xl font-bold tracking-tight">My Locations</h1>
           <Button variant={"outline"}
            size={"icon"}
            onClick={handleRefresh}
            disabled={weatherQuery.isFetching || forecastQuery.isFetching}
           >
              <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching ? "animate-spin":""}`}/>
           </Button>
       </div>


       {/**Current and Hourly Weather*/}

       <div className="grid gap-6">
          <div className="flex flex-col lg:flex-row gap-2">
            <CurrentWeather data={weatherQuery.data} locationName={locationName} />
            <HourlyTemprature data={forecastQuery.data} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 items-start">
            {/*deatils*/}
            <WeatherDetails data={weatherQuery.data}/>
            {/** forecast */}
            <WeatherForecast data={forecastQuery.data} />
          </div>
       </div>
    </div>
  )
}

export default WeatherDashboard