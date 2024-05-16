// import { StyleSheet, Text, View } from 'react-native';
// const images = {
//   raudiep: require('./images/raudiep.png'),
//   hoahuongduong: require('./images/hoahuongduong.png'),
//   rauma: require('./images/rauma.png'),
//   caydialang: require('./images/caydialang.png'),
//   caycachua: require('./images/caycachua.png'),
//   caycarot: require('./images/caycarot.png'),
//   caybido: require('./images/caybido.png'),
//   caycaibap: require('./images/caycaibap.png'),
//   caydualeo: require('./images/caydualeo.png'),
//   caycatim: require('./images/caycatim.png'),
//   caycaicuc: require('./images/caycaicuc.png'),
//   cayrauden: require('./images/cayrauden.png'),
//   cayraucaingot: require('./images/cayraucaingot.png'),
//   caymuop: require('./images/caymuop.png'),
//   cayrauram: require('./images/cayrauram.png'),
// };
// export default function ThongSo() {
//   const [locationName, setLocationName] = useState('');
//   const [currentWeather, setCurrentWeather] = useState('');
//   const [temperature, setTemperature] = useState('');
//   const [wind, setWind] = useState('');
//   const [humidity, setHumidity] = useState('');
//   const [hourlyWeather, setHourlyWeather] = useState('');
//   const [data, setData] = useState([]);
//   const [averageTemperature, setAvarageTemperature] = useState('');
//   const [averageHumidity, setAvarageHumidity] = useState('');
//   useEffect(() => {
//     getLocation();
//   }, []);

//   const getLocation = async () => {
//     try {
//       let { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         console.error('Permission to access location was denied');
//         return;
//       }

//       let location = await Location.getCurrentPositionAsync({});
//       // console.log(location.coords.latitude);
//       // console.log(location.coords.longitude);
//       getLocationName(location.coords.latitude, location.coords.longitude);
//       getWeatherByLocation(location.coords.latitude, location.coords.longitude); // Gọi hàm lấy thời tiết
//       getHourlyWeatherByLocation(location.coords.latitude, location.coords.longitude);
//     } catch (error) {
//       console.error('Error getting location:', error);
//     }
//   };
//   const getPlants = async () => {
//     try {
//       const response = await fetch('http://10.20.178.170:8080/plants');
//       const json = await response.json();
     
//       const filteredData = json.filter(plant => plant.tempMin <= averageTemperature && plant.tempMax >= averageTemperature && plant.humidityMin <= averageHumidity && plant.humidityMax >= averageHumidity);
//       console.log("success");
//       // setData(filteredData);
//       setData(filteredData);
//     } catch (error) {
//       console.error(error);
//     } 
//   };
//   async function getCurrentWeather(latitude, longitude) {
//     const API_KEY = '6c8d056cee58e57ff1d65a33edcf5c2e'; // Thay 'YOUR_API_KEY' bằng khóa API thực tế của bạn
//     const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error('Failed to fetch weather data');
//       }

//       const weatherData = await response.json();
//       return weatherData;
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       return null;
//     }
//   }
//   async function getHourlyWeather(latitude, longitude) {
//     const API_KEY = '6c8d056cee58e57ff1d65a33edcf5c2e'; // Thay 'YOUR_API_KEY' bằng khóa API thực tế của bạn
//     const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;

//     try {
//       const response = await fetch(apiUrl);
//       if (!response.ok) {
//         throw new Error('Failed to fetch hourly weather data');
//       }

//       const weatherData = await response.json();
//       return weatherData;
//     } catch (error) {
//       console.error('Error fetching weather data:', error);
//       return null;
//     }
//   }
//   const getWeatherByLocation = async (latitude, longitude) => {
//     try {
//       const weatherData = await getCurrentWeather(latitude, longitude);
//       // console.log('Weather data:', weatherData);
//       // setCurrentWeather(weatherData.weather[0].main);
//       setCurrentWeather(weatherData.weather[0].main);
//       setTemperature(Math.round(weatherData.main.temp - 273.15));
//       setWind(weatherData.wind.speed);
//       setHumidity(weatherData.main.humidity)
//       // Xử lý dữ liệu thời tiết ở đây, ví dụ:
//       // setCurrenWeather(weatherData);
//     } catch (error) {
//       console.error('Error getting weather data:', error);
//     }
//   };
//   const getHourlyWeatherByLocation = async (latitude, longitude) => {
//     try {
//       const weatherData = await getHourlyWeather(latitude, longitude);
//       // console.log('Weather data:', weatherData);
//       setHourlyWeather(weatherData);
//       const temperatures = weatherData.list.map(item => item.main.temp - 273.15);
//       const averageTemp = temperatures.reduce((acc, temp) => acc + temp, 0) / temperatures.length;
//       console.log(averageTemp);
//       setAvarageTemperature(averageTemp);
//       const humidities = weatherData.list.map(item => item.main.humidity);
//       const averageHum = humidities.reduce((acc, hum) => acc + hum, 0) / humidities.length;
//       // Xử lý dữ liệu thời tiết ở đây, ví dụ:
//       // setCurrenWeather(weatherData);
//       console.log(averageHum);
//       setAvarageHumidity(averageHum);
//     } catch (error) {
//       console.error('Error getting weather data:', error);
//     }
//   };

//   const getLocationName = async (latitude, longitude) => {
//     try {
//       const response = await axios.get(
//         `http://api.geonames.org/findNearbyPlaceNameJSON?lat=${latitude}&lng=${longitude}&username=baopqptit`
//       );

//       if (response.data && response.data.geonames && response.data.geonames.length > 0) {
//         setLocationName(response.data.geonames[0].name);
//       }
//     } catch (error) {
//       console.error('Error getting location name:', error);
//     }
//   };
//   const changeBackground = () => {
//     if (currentWeather == 'Rain') {
//       return ['#949EB3', '#041C4A']
//     }
//     if (currentWeather == 'Clear') {
//       return ['#FFFFFF', '#2F76FF']
//     }

//     return ['#949EB3', '#8FABE2']
//   }

//   const weatherImages = (weather) => {
//     if (weather === "Rain") {
//       return <Rain height={50} width={40} />;
//     }
//     if (weather === "Clear") {
//       return <Clear height={50} width={40} />;
//     }
//     return <Clouds height={50} width={40} />;
//   };

//   const weatherBigImages = (weather) => {
//     if (weather === "Rain") {
//       return <Rain height={220} width={180} />;
//     }
//     if (weather === "Clear") {
//       return <Clear height={220} width={180} />;
//     }
//     return <Clouds height={220} width={180} />;
//   };

//   const [earth, setEarth] = useState(true)
//   const [chart, setChart] = useState(false)

//   const renderForecast = () => {
//     if (hourlyWeather.list) {
//       return (
//         <ScrollView horizontal>
//           {hourlyWeather.list.map((item, index) => (
//             <View key={index} style={styles.forecastItem}>
//               <Text style={{fontSize:18, color:'white'}}>{item.dt_txt.substring(0, 10)}</Text>
//               <Text style={{fontSize:18, color:'white'}}>{item.dt_txt.substring(11, 16)}</Text>
//               {weatherImages(item.weather[0].main)}
//               <Text style={{fontSize:18, color:'white'}}>{` ${Math.round(item.main.temp - 273.15)}°C`}</Text>
//             </View>
//           ))}
//         </ScrollView>
//       );
//     }
//   }

//   const TreeInfo = ({ item }) => {
//     const [isInfoVisible, setInfoVisible] = useState(false);

//     return (
//       <View style={styles.treeInfo}>
//         <TouchableOpacity onPress={() => setInfoVisible(!isInfoVisible)}>
//           <Image style={styles.tree} source={images[item.image]} />
//           <Text style={{ fontWeight: 'bold', alignItems: 'center' }}>{item.name}</Text>
//           {isInfoVisible && <Text>{item.description}</Text>}
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const renderTree = () => {
//     return (
//       <ScrollView>
//         {data.map((item, index) => (
//           <TreeInfo key={index} item={item} />
//         ))}
//       </ScrollView>
//     );
//   }
//   function Statistical() {
//     const screenWidth = Dimensions.get("window").width;
    
//     const formatLabel = (label) => {
//       const firstLine = label.substring(0, 10);
//       const secondLine = label.substring(10, 16);
//       return [firstLine, secondLine];
//   };
//    if(hourlyWeather && hourlyWeather.list) {
//         const data = {
//             labels: hourlyWeather.list.map((item) => formatLabel(item.dt_txt)),
//             datasets: [
//                 {
//                     data: hourlyWeather.list.map((item) => item.main.temp - 273.15),
//                 }
//             ],
//         };
       
//         const chartConfig = {
//             backgroundGradientFrom: "#1E2923",
//             backgroundGradientFromOpacity: 0,
//             backgroundGradientTo: "#08130D",
//             backgroundGradientToOpacity: 1,
//             color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
//             strokeWidth: 3,
//             barPercentage: 0.5,
//             useShadowColorFromDataset: false,
//             horizontalLabelRotation: 45 // Xoay nhãn để đọc dễ dàng hơn
//         };

//         // Tính toán chiều rộng của mỗi nhãn dựa trên số lượng nhãn và khoảng cách mong muốn
//         const labelWidth = 150; // Điều chỉnh giá trị này theo nhu cầu
//         const contentWidth = data.labels.length * labelWidth;
//         const scrollViewEnabled = contentWidth > screenWidth;

//         return (
//             <ScrollView horizontal={scrollViewEnabled}>
//                 <LineChart
//                     data={data}
//                     width={contentWidth < screenWidth ? screenWidth : contentWidth}
//                     height={220}
//                     chartConfig={chartConfig}
//                     bezier
//                 />
//             </ScrollView>
//         );
//     }

//     return null; // Trả về null nếu hourlyWeather hoặc hourlyWeather.list không có sẵn
// }


//   return (
//     <LinearGradient
//       colors={changeBackground()}
//       style={styles.container}
//     >
//       <View style={styles.top}>
//         <TouchableOpacity onPress={() => { setEarth(true), setChart(false) }}>
//           <Earth color={earth ? 'black' : 'rgba(0,0,0,0.4)'} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => { setEarth(false), setChart(true), getPlants() }}>
//           <Chart color={earth ? 'rgba(0,0,0,0.4)' : 'black'} />
//         </TouchableOpacity>

//       </View>

//       {earth && (
//         <View style={styles.container}>
//           <Text style={styles.locationText}>
//             {locationName ? ` ${locationName}` : 'Fetching location...'}
//           </Text>
//           {weatherBigImages(currentWeather)}
//           <View style={styles.indextemp}>
//             <Text style={styles.temperature}>
//               {temperature}°C
//             </Text>
//           </View>

//           <View style={styles.index}>
//             <View style={styles.indexwind}>
//               <Wind />
//               <Text style={styles.windText}>
//                 {wind}m/s
//               </Text>
//             </View>
//             <View style={styles.indexwind}>
//               <Water />
//               <Text style={styles.windText}>
//                 {humidity}%
//               </Text>
//             </View>
//           </View>
//           <View style={styles.forecast}>
//             {renderForecast()}
//           </View>
//         </View>
//       )}
//       {chart && (
//         <View style={styles.containerChart}>
//           <View style={{
//             display: 'flex',

//             justifyContent: 'Center',
//             alignItems: 'center',
//             padding: 20,
//             width: '88%',
//             backgroundColor:'rgba(0,0,0,0.7)',
//             borderRadius:20
//           }}>
//             {Statistical()}
//           </View>

//           <View style={styles.treeList}>
//             <Text style={styles.treeTitle}>
//               {/* Các cây trồng phù hợp với thời tiết */}
//             </Text>
//             {renderTree()}
//           </View>
//         </View>
//       )}
//     </LinearGradient>
//   );
//   }
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//     },
//     containerChart: {
//       flex: 1,
//       alignItems: 'center',
//       gap: 20,
//     },
  
//     locationText: {
//       color: 'white',
//       fontSize: 48,
//       textAlign: 'center',
//       padding: 5,
//       fontWeight: 'bold',
//     },
//     top: {
//       display: 'flex',
//       gap: 60,
//       justifyContent: 'Center',
//       alignItems: 'center',
//       flexDirection: 'row',
//       padding: 50,
//     },
  
//     indextemp: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 25,
//     },
  
//     indexwind: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'row',
//       gap: 10,
//     },
  
//     index: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'row',
//       gap: 60,
//     },
//     temperature: {
//       color: 'white',
//       fontSize: 44,
//       fontWeight: 'bold',
//     },
  
//     windText: {
//       color: 'white',
//       fontSize: 25,
//       fontWeight: 'bold',
//     },
//     forecast: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       flexDirection: 'row',
//       gap: 30,
//       padding: 30,
//       flex: 1,
//     },
//     forecastItem: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: 'rgba(37, 31, 32, 0.5)',
//       borderRadius: 30,
//       marginRight: 10,
//       padding: 20,
//       marginRight: 10,
  
//     },
//     statistical: {
  
  
//     },
  
//     treeList: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 20,
//       backgroundColor: 'rgba(217, 217, 217, 0.5)',
//       borderRadius: 20,
//       height: 350,
//       width: '92%',
//       height: '50%',
//     },
  
//     tree: {
//       width: 300,
//       height: 100,
//       borderRadius: 20,
//     },
//     treeInfo: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       padding: 10,
//     },
  
//     treeTitle: {
//       fontSize: 20,
//       fontWeight: 'bold', // Sử dụng 'bold' để làm chữ đậm
  
//     }
  
//   });
  