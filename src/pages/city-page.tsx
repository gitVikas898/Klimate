import CurrentWeather from "@/components/CurrentWeather";
import HourlyTemprature from "@/components/HourlyTemprature";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherForecast from "@/components/WeatherForecast";
import WeatherSkeleton from "@/components/WeatherSkeleton";
import { useForecastQuery, useWeatherQuery } from "@/hooks/useWeather";
import { AlertTriangle } from "lucide-react";
import { useParams,useSearchParams } from "react-router-dom";


const CityPage = () => {

  const[searchParams] = useSearchParams();

  const params = useParams();
  const lat = parseFloat(searchParams.get("lat") || "0");
  const lon = parseFloat(searchParams.get("lon") || "0");

  const coordinates = {lat,lon};

  const weatherQuery = useWeatherQuery(coordinates);
  const forecastQuery = useForecastQuery(coordinates);


  if(weatherQuery.error || forecastQuery.error){
    return (
      <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        <p>Failed to Fetch Weather Data Please Try Again</p>
      </AlertDescription>
    </Alert>
    )
  }

  if(!weatherQuery.data || !forecastQuery.data || !params.cityName){
    return <WeatherSkeleton/>
  }
  


  return (
    <div className="space-y-4">
    {/**Favourite Cities */}
     <div className="flex items-center justify-between">
         <h1 className="text-xl font-bold tracking-tight">{params.cityName},{weatherQuery.data.sys.country}</h1>
     </div>
      <div>
          {/* add to fav */}
      </div>

     {/**Current and Hourly Weather*/}

     <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-2">
          <CurrentWeather data={weatherQuery.data} />
          <HourlyTemprature data={forecastQuery.data} />
        </div>

        <div className="grid gap-6 md:grid-cols-1 items-start">
          {/*deatils*/}
          <WeatherDetails data={weatherQuery.data}/>
          {/** forecast */}
          <WeatherForecast data={forecastQuery.data} />
        </div>
     </div>
  </div>
  )
}

export default CityPage