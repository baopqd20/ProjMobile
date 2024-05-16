import React, { Component, useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  StyleSheet,
  Button,
  TextInput,
  Image,
  ScrollView,
  Modal,
} from "react-native";
import { Back } from "../../Icon/icon";
import { Note } from "../../Icon/icon";
import axios from "axios";
import { err } from "react-native-svg";

// const data = [
//   {
//     id:1,
//     name: "Cây lúa",
//     muaVuThichHop: "Tùy thuộc vào loại và điều kiện địa phương, nhưng thường trồng vào mùa xuân và mùa hè.",
//     temp:"Phụ thuộc vào giống và giai đoạn phát triển, nhưng nhiệt độ dao động từ 20°C đến 35°C.",
//     hump:"Cần độ ẩm cao, khoảng 70-90% trong quá trình mầm nảy mầm và phát triển.",
//     dat:"Đất cần độ ẩm cao, nhưng cũng cần thoát nước tốt để tránh ngập úng.",
//     img: require("./Tree/Lua.png"),
//     dec: "Lúa là loài thực vật thuộc một nhóm các loài cỏ đã thuần dưỡng. Lúa sống một năm, có thể cao từ 1-1,8 m, đôi khi cao hơn, với các lá mỏng, hẹp (khoảng 2-2,5 cm) và dài 50–100 cm. Rễ chùm, có thể dài từ 2–3 m/cây trong thời kỳ trổ bông. Tuỳ thời kì sinh trưởng, phát triển mà lá lúa có màu khác nhau. Khi lúa chín ngả sang màu vàng. Các hoa nhỏ, màu trắng sữa, tự thụ phấn mọc thành các cụm hoa phân nhánh cong hay rủ xuống, dài 35–50 cm. Hạt là loại quả thóc (hạt nhỏ, cứng của các loại cây ngũ cốc) dài 5–12 mm và dày 1–2 mm. Cây lúa non được gọi là mạ.",
//   },
//   {
//     id:2,
//     name: "Cây cà chua",
//     muaVuThichHop: "Trồng quanh năm nhưng thích hợp trong mùa xuân và mùa hè.",
//     temp:"Tốt nhất trong khoảng 20°C đến 30°C.",
//     hump:"Cần độ ẩm không quá cao, khoảng 60-80%.",
//     dat:"Cần đất thoát nước tốt và giàu chất dinh dưỡng.",
//     img: require("./Tree/CaChua.png"),
//     dec: "Cà chua (danh pháp hai phần: Solanum lycopersicum), thuộc họ Cà (Solanaceae), là một loại rau quả làm thực phẩm. Quả ban đầu có màu xanh, chín ngả màu từ vàng đến đỏ. Cà chua có vị hơi chua và là một loại thực phẩm bổ dưỡng, tốt cho cơ thể, giàu vitamin C và A, đặc biệt là giàu lycopene tốt cho sức khỏe. Cà chua thuộc họ Cà, các loại cây trong họ này thường phát triển từ 1 đến 3 mét chiều cao, có những cây thân mềm bò trên mặt đất hoặc dây leo trên thân cây khác, ví dụ nho. Họ cây này là một loại cây lâu năm trong môi trường sống bản địa của nó, nhưng nay nó được trồng như một loại cây hàng năm ở các vùng khí hậu ôn đới và nhiệt đới.",
//   },
//   {
//     id:3,
//     name: "Cây dưa chuột",
//     muaVuThichHop: "Trồng vào mùa xuân và mùa hè.",
//     temp:"Tốt nhất trong khoảng 20°C đến 30°C.",
//     hump:"Cần độ ẩm cao, khoảng 70-90%.",
//     dat:"Cần đất thoát nước tốt và giàu chất hữu cơ.",
//     img: require("./Tree/DuaChuot.png"),
//     dec: "Dưa chuột (danh pháp hai phần: Cucumis sativus), hay còn gọi là dưa leo, là một cây trồng phổ biến trong họ Cucurbitaceae). Dưa chuột là một loại rau ăn quả thương mại quan trọng, được trồng lâu đời trên thế giới và trở thành thực phẩm của nhiều nước. Những nước dẫn đầu về diện tích gieo trồng và năng suất là: Trung Quốc, Nga, Nhật Bản, Mỹ, Hà Lan, Thổ Nhĩ Kỳ, Ba Lan, Ai Cập và Tây Ban Nha.",
//   },
//   {
//     id:4,
//     name: "Rau cải thảo",
//     muaVuThichHop: " Thích hợp trồng quanh năm.",
//     temp:"Tốt nhất trong khoảng 15°C đến 25°C.",
//     hump:"Cần độ ẩm cao, khoảng 70-90%.",
//     dat:" Cần đất thoát nước tốt và giàu chất dinh dưỡng.",
//     img: require("./Tree/RauCaiThao.png"),
//     dec: "Bắp cải thảo còn được gọi là cải bao, cải cuốn, cải bắp tây (danh pháp ba phần: Brassica rapa subsp. pekinensis), là phân loài thực vật thuộc họ Cải ăn được có nguồn gốc từ Trung Quốc, được sử dụng rộng rãi trong các món ăn ở Đông Nam Á và Đông Á. Loài thực vật này trồng nhiều ở Trung Quốc, Hàn Quốc, Nhật Bản, Việt Nam... nhưng cũng có thể bắt gặp ở Bắc Mỹ, châu Âu, Úc, New Zealand. Cải thảo có màu sắc khá giống với cải bắp, phần lá bao ngoài của màu xanh đậm, còn lá cuộn ở bên trong (gọi là lá non) có màu xanh nhạt, trong khi phần cuống lá có màu trắng.",
//   },
//   {
//     id:5,
//     name: "Cây súp lơ",
//     muaVuThichHop: "Trồng trong mùa xuân và mùa thu.",
//     temp:"Tốt nhất trong khoảng 15°C đến 25°C.",
//     hump:"Cần độ ẩm cao, khoảng 70-90%.",
//     dat:"Cần đất thoát nước tốt và giàu chất dinh dưỡng.",
//     img: require("./Tree/SupLo.png"),
//     dec: "Bông cải trắng hay còn gọi là súp lơ, hay su lơ, bắp su lơ, hoa lơ (tiếng Pháp: Chou-fleur), cải hoa hay cải bông trắng là một loại cải ăn được, thuộc loài Brassica oleracea, họ Cải, mọc quanh năm, gieo giống bằng hạt. Phần sử dụng làm thực phẩm của súp lơ là toàn bộ phần hoa chưa nở, phần này rất mềm, xốp nên không chịu được mưa nắng. Phần lá và thân thường chỉ được sử dụng làm thức ăn cho gia súc. Súp lơ có phần lá rất phát triển, nhưng bộ rễ lại phát triển kém thường ăn nông (ở lớp đất 10 – 15 cm) và ít lan rộng, vì thế tính chịu hạn, chịu nước kém. Cây thân thảo, có thể sống 2 năm, ưa đất ẩm, nhiều mùn yêu cầu về dinh dưỡng khá cao, cây thích ánh sáng nhẹ, chịu được lạnh; nhiệt độ thích hợp nhất cho sinh trưởng và phát triển là 15-18oC, từ 25oC trở lên cây mọc kém, chậm, mau hóa già, cho hoa bé và dễ nở. Tuy nhiên, ở giai đoạn đang ra hoa nếu gặp phải nhiệt độ dưới 10oC hoa cũng bị bé, phẩm chất kém. Ở Việt Nam, các vùng trồng súp lơ phổ biến là miền có khí hậu lạnh như miền Bắc vào mùa Đông hay các vùng núi cao như Tây Nguyên, nhất là vùng Đà Lạt Lâm Đồng.",
//   },
//   {
//     id:6,
//     name: "Cây chuối",
//     muaVuThichHop: "Trồng quanh năm nhưng thích hợp trong mùa xuân và mùa hè.",
//     temp:"Tốt nhất trong khoảng 25°C đến 30°C.",
//     hump:"Cây chuối cần độ ẩm cao, khoảng 80-90%.",
//     dat:"Cần đất giữ ẩm tốt nhưng cũng phải thoát nước nhanh chóng.",
//     img: require("./Tree/CayChuoi.png"),
//     dec: "Cây chuối thuộc về họ Chuối. Nó được trồng chủ yếu để lấy trái cây của nó, và ở mức độ ít hơn là thân và để trang trí. Vì cây thường mọc lên cao, thẳng, và hơi vững, nó thường bị lầm lẫn với thân cây thật, trong khi thân chính của nó là một thân giả (tiếng Anh: pseudostem). Thân giả của một số loài có thể cao tới 2–8 m, với lá kéo dài 3,5 m. Mỗi thân giả có thể ra 1 buồng chuối màu vàng, xanh, hay ngay cả màu đỏ, trước khi chết và bị thay bằng thân giả mới.Quả của những cây chuối dại (ở Việt Nam còn gọi là chuối rừng) có nhiều hột lớn và cứng. Nhưng hầu hết loại chuối được buôn bán để ăn thiếu hột (xem Trái cây không có hột) vì đã được thuần hóa lâu đời nên có bộ nhiễm sắc thể đa bội (thường là tam bội). Cây thường mọc thành bụi và được trồng bằng cách tách rời cây non đem trồng thành bụi mới. Quả chuối ra thành nải treo, mỗi tầng (gọi là nải) có tới 20 quả, và mỗi buồng có 3–20 nải. Các nải nhìn chung gọi là một buồng, nặng 30–50 kg. Một quả trung bình nặng 125 g, trong số đó vào khoảng 75% là nước và 25% là chất khô. Mỗi quả riêng có vỏ dai chung quanh thịt mềm ăn được. Vỏ và thịt đều ăn được ở dạng tươi hay đã qua chế biến (nấu). Những người phương Tây thường ăn thịt chuối còn tươi và vứt vỏ, trong khi một số nước Á Đông nấu rồi ăn cả vỏ và thịt. Quả chuối thường có nhiều sợi (gọi là bó libe) nằm giữa vỏ và thịt. Chuối chứa nhiều vitamin B6, vitamin C và kali.",
//   },
//   {
//     id:7,
//     name: "Cây bưởi",
//     muaVuThichHop: "Trồng quanh năm nhưng thích hợp trong mùa xuân và mùa hè.",
//     temp:" Tốt nhất trong khoảng 25°C đến 30°C.",
//     hump:"Cần độ ẩm không quá cao, khoảng 60-80%.",
//     dat:"Cần đất giữ ẩm tốt nhưng cũng phải thoát nước nhanh chóng.",
//     img: require("./Tree/CayBuoi.png"),
//     dec: "Cây bưởi có thể cao từ 5–15 m (16–49 ft), có thể có thân cong queo dày 10–30 cm (4–12 in) và các nhánh thấp, không đều. Cuống lá bưởi có cánh rõ rệt, với dạng hình trứng hoặc elip xen kẽ, dài 5–20 cm (2–8 in), có lớp vỏ ở trên màu xanh xỉn và có lông ở mặt dưới. Hoa bưởi - mọc đơn lẻ hoặc mọc thành chùm - có mùi thơm và màu trắng vàng. Quả to, 15–25 cm (5,9–9,8 in), thường nặng 1–2 kg (2–4 lb). Vỏ dày hơn bưởi chùm và được chia thành 11 đến 18 múi. Thịt quả có vị nhẹ như bưởi chùm, với một chút vị đắng thường (bưởi chùm là giống lai giữa bưởi và cam). Các màng bao bọc xung quanh các múi bưởi dai và đắng, thường không ăn được và bị loại bỏ. Có ít nhất 60 giống cây. Quả thường chứa ít hạt, hạt tương đối lớn, nhưng một số giống cây có nhiều hạt.",
//   },
//   {
//     id:8,
//     name: "Cây ổi",
//     muaVuThichHop: "Trồng quanh năm nhưng thích hợp trong mùa xuân và mùa hè.",
//     temp:"Tốt nhất trong khoảng 20°C đến 30°C.",
//     hump:"Cây ổi cần độ ẩm không quá cao, khoảng 60-80%.",
//     dat:"Đất cần thoát nước tốt, không nên quá đọng nước.",
//     img: require("./Tree/CayOi.png"),
//     dec: "Cây ổi (tên khoa học: Carica papaya) là một loại cây thuộc họ Caricaceae, có nguồn gốc từ vùng nhiệt đới và cận nhiệt đới ở Mỹ Latinh. Cây ổi được trồng phổ biến ở nhiều nơi trên thế giới với mục đích làm cây trồng thực phẩm và làm cảnh quan.Cây ổi là một loại cây nhỏ đa thân, thân cây có lớp vỏ mỏng và lá cây mọc tập trung ở đỉnh.Lá cây hình lưỡi liềm, có chiều dài từ 50 đến 70 cm, có gân lá rõ ràng.Cây có hoa riêng biệt giữa hoa đực và hoa cái, hoa đực thường mọc thành cụm ở phía trên cây trong khi hoa cái thường mọc ở phía dưới.Quả của cây ổi là quả dạng quả lê có kích thước từ nhỏ đến lớn, có màu vàng cam khi chín.Cây ổi thường được trồng như một cây ăn quả trong vườn nhà hoặc như một phần của vườn cây trồng lớn hơn.Quả của cây được sử dụng làm thực phẩm tươi, làm nước ép hoặc làm thành các sản phẩm chế biến thực phẩm khác như mứt, sinh tố, hay kem.Ngoài ra, các phần khác của cây như lá và cây non cũng có thể được sử dụng trong nhiều món ăn và thực phẩm chữa bệnh truyền thống.",
//   },
//   {
//     id:9,
//     name: "Cây vải",
//     muaVuThichHop: "Trồng vào mùa xuân và mùa hè.",
//     temp:" Tốt nhất trong khoảng 25°C đến 35°C.",
//     hump:"Cần độ ẩm không quá cao, khoảng 60-80%.",
//     dat:"Cần đất giữ ẩm tốt nhưng cũng phải thoát nước nhanh chóng.",
//     img: require("./Tree/CayVai.png"),
//     dec: "Vải là cây thường xanh với kích thước trung bình, có thể cao tới 15–20 m, có lá hình lông chim mọc so le, mỗi lá dài 15–25 cm, với 2-8 lá chét ở bên dài 5–10 cm và không có lá chét ở đỉnh. Các lá non mới mọc có màu đỏ đồng sáng, sau đó chuyển dần thành màu xanh lục khi đạt tới kích thước cực đại. Hoa nhỏ màu trắng ánh xanh lục hoặc trắng ánh vàng, mọc thành các chùy hoa dài tới 30 cm. Quả là loại quả hạch, hình cầu hoặc hơi thuôn, dài 3–4 cm và đường kính 3 cm. Lớp vỏ ngoài màu đỏ, cấu trúc sần sùi, không ăn được nhưng dễ dàng bóc được. Bên trong là lớp cùi thịt màu trắng mờ, ngọt và giàu vitamin C, có kết cấu tương tự như của quả nho. Ở giữa quả là một hạt màu nâu, dài 2 cm và đường kính cỡ 1-1,5 cm. Hạt - tương tự như hạt của quả dẻ ngựa - có độc tính nhẹ và không nên ăn. Quả chín vào giai đoạn từ tháng 6 (ở các vùng gần xích đạo) đến tháng 10 (ở các vùng xa xích đạo), khoảng 100 ngày sau khi cây ra hoa.",
//   },
//   {
//     id:10,
//     name: "Hoa hồng",
//     muaVuThichHop: " Trồng quanh năm nhưng thích hợp trong mùa xuân và mùa hè.",
//     temp:"Tốt nhất trong khoảng 18°C đến 25°C.",
//     hump:"Hoa hồng cần độ ẩm trong không khí tương đối cao, khoảng 60-70%. Tuy nhiên, độ ẩm quá cao có thể gây ra các vấn đề về nấm và các bệnh cây khác.",
//     dat:"Đất cho hoa hồng cần phải thoát nước tốt nhưng vẫn giữ đủ ẩm. Độ ẩm đất tốt nhất là khoảng 60-70%.",
//     img: require("./Tree/HoaHong.png"),
//     dec: "Hồng hay hường là tên gọi chung cho các loài thực vật có hoa dạng cây bụi hoặc cây leo lâu năm thuộc chi Rosa, họ Rosaceae, với hơn 100 loài với màu hoa đa dạng, phân bố từ miền ôn đới đến nhiệt đới. Các loài này nổi tiếng vì hoa đẹp nên thường gọi là hoa hồng. Phần lớn có nguồn gốc từ bản địa châu Á, số ít còn lại có nguồn gốc bản địa từ châu Âu, Bắc Mỹ và Tây Bắc Phi. Các loài bản địa, giống cây trồng và cây lai ghép đều được trồng làm cảnh và lấy hương thơm và được làm quà. Đây là các cây bụi mọc đứng hoặc mọc leo, thân và cành có gai. Lá kép lông chim sẻ, lá chét khía răng, có lá kèm. Hoa thơm, màu sắc đa dạng: hồng, trắng, vàng hay đỏ... Hoa thường có nhiều cánh do nhị đực biến thành. Đế hoa hình chén. Quả bế, tụ nhau trong đế hoa tôn dày lên thành quả.có mùi thơm đặc trưng",
//   },
//   {
//     id:11,
//     name: "Cây khoai lang",
//     muaVuThichHop: "Trồng vào mùa xuân và mùa hè.",
//     temp:"Tốt nhất trong khoảng 15°C đến 25°C.",
//     hump:"Cần độ ẩm ổn định, khoảng 60-80%.",
//     dat:"Cần đất thoát nước tốt và giàu chất hữu cơ.",
//     img: require("./Tree/KhoaiLang.png"),
//     dec: "Khoai lang (danh pháp hai phần: Ipomoea batatas) là một loài cây nông nghiệp với các rễ củ lớn, chứa nhiều tinh bột, có vị ngọt, được gọi là củ khoai lang và nó là một nguồn cung cấp rau ăn củ quan trọng, được sử dụng trong vai trò của cả rau lẫn lương thực. Các lá non và thân non cũng được sử dụng như một loại rau. Khoai lang có quan hệ họ hàng xa với khoai tây (Solanum tuberosum) có nguồn gốc Nam Mỹ và quan hệ họ hàng rất xa với khoai mỡ (một số loài trong chi Dioscorea) là các loài có nguồn gốc từ châu Phi và châu Á.",
//   },
//   {
//     id:12,
//     name: "Cây khoai tây",
//     muaVuThichHop: "Trồng vào mùa xuân và mùa hè.",
//     temp:"Tốt nhất trong khoảng 15°C đến 25°C.",
//     hump:"Cần độ ẩm ổn định, khoảng 60-80%.",
//     dat:"Cần đất thoát nước tốt và giàu chất hữu cơ.",
//     img: require("./Tree/KhoaiTay.png"),
//     dec: "Khoai tây (danh pháp hai phần: Solanum tuberosum), thuộc họ Cà (Solanaceae). Khoai tây là loài cây nông nghiệp ngắn ngày, trồng lấy củ chứa tinh bột. Chúng là loại cây trồng lấy củ rộng rãi nhất thế giới và là loại cây trồng phổ biến thứ tư về mặt sản lượng tươi – xếp sau lúa, lúa mì và ngô. Lưu trữ khoai tây dài ngày đòi hỏi bảo quản trong điều kiện lạnh.",
//   },
//   {
//     id:13,
//     name: "Cây thanh long",
//     muaVuThichHop: "Đất cho hoa hồng cần phải thoát nước tốt nhưng vẫn giữ đủ ẩm. Độ ẩm đất tốt nhất là khoảng 60-70%.",
//     temp:"Thanh long cần nhiệt độ từ 20°C đến 30°C để phát triển tốt nhất. Nhiệt độ dưới 10°C có thể gây hại cho cây và nhiệt độ quá cao có thể làm giảm chất lượng quả.",
//     hump:"Thanh long cần nhiệt độ từ 20°C đến 30°C để phát triển tốt nhất. Nhiệt độ dưới 10°C có thể gây hại cho cây và nhiệt độ quá cao có thể làm giảm chất lượng quả.",
//     dat:"Đất cho thanh long cần thoát nước tốt và giàu chất hữu cơ. Độ ẩm đất tốt nhất là khoảng 60-70%.",
//     img: require("./Tree/ThanhLong.png"),
//     dec: "Thanh long là trái cây của một vài loài được trồng chủ yếu để lấy quả, thuộc họ Xương rồng, bộ Cẩm chướng. Thanh long là loài thực vật bản địa tại México, các nước Trung Mỹ và Nam Mỹ. Hiện nay, loài cây này cũng được trồng ở các nước trong khu vực Đông Nam Á như Việt Nam, Malaysia, Thái Lan, Philippines, Indonesia (đặc biệt là ở miền tây đảo Java); miền nam Trung Quốc, Đài Loan và một số khu vực khác.",
//   },
// ];
const Images = {
  cayLua : require("./Tree/Lua.png"),
  cayCaChua: require("./Tree/CaChua.png"),
  cayDuaChuot:require("./Tree/DuaChuot.png"),
  rauCaiThao:require("./Tree/RauCaiThao.png"),
  supLo:require("./Tree/SupLo.png"),
  cayChuoi:require("./Tree/CayChuoi.png"),
  cayBuoi:require("./Tree/CayBuoi.png"),
  cayOi: require("./Tree/CayOi.png"),
  cayVai:require("./Tree/CayVai.png"),
  hoaHong:require("./Tree/HoaHong.png"),
  khoaiLang:require("./Tree/KhoaiLang.png"),
  khoaiTay:require("./Tree/KhoaiTay.png"),
  thanhLong:require("./Tree/ThanhLong.png")
}
export default function Tree({ navigation, route }) {
  const [detail, setDetail] = useState(false);
  const [id, setId] = useState(0);
  const data = route.params
  const [img, setImg] = useState('')
  const goBack = () => {
    return navigation.push("Info");
  };
  const modal = (tree:any) => {
    if ((tree.id == id)) {
      return (
        <Modal
          key={tree.id}
          animationType="slide"
          transparent={true}
          visible={detail}
          onRequestClose={() => {
            setDetail(!detail);
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              padding:10
            }}
            
          >
            <ImageBackground
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
               
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 10,
                
                maxHeight: "60%",
                overflow: "hidden",
                backgroundColor: "rgba(25, 255, 255, 0.5)",
              }}
              source={Images[tree.img]}
              resizeMode="cover"
              
            >
              <ScrollView>
                <View  style={{ display: "flex", gap: 20,  backgroundColor: "rgba(255, 255, 255, 0.8)",padding:10, borderRadius:10 }}>
                  <View style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                  <Image
                    source={Images[tree.img]}
                    style={{ width: 250, height: 260, borderRadius:10, borderColor:'black', borderWidth:1  }}
                  />
                  </View>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ fontSize: 25, fontWeight: "600",  }}>
                      {tree.name}
                    </Text>
                  </View>
                  <Text style={{textAlign:'justify',fontWeight: "500",}}>- Mùa vụ: {tree.muaVuThichHop}</Text>
                  <Text style={{textAlign:'justify',fontWeight: "500"}}>- Nhiệt độ: {tree.temp}</Text>
                  <Text style={{textAlign:'justify',fontWeight: "500"}}>- Độ ẩm: {tree.hump}</Text>
                  <Text style={{textAlign:'justify',fontWeight: "500"}}>- Độ ẩm đất: {tree.dat}</Text>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "row",
                      gap: 5,
                    }}
                  >
                    <Note color={"rgba(255, 0, 0, 0.7)"} />
                    <Text
                      style={{
                        fontSize: 18,
                        color: "rgba(255, 0, 0, 1)",
                        fontWeight: "500",
                      }}
                    >
                      Mô tả
                    </Text>
                  </View>
                  <Text style={{textAlign:'justify',fontWeight: "500"}}>{tree.dec}</Text>
                  <View
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderWidth: 1,
                        borderColor: "rgba(31, 174, 255, 1)",
                        backgroundColor: "rgba(31, 174, 255, 0.6)",
                        borderRadius: 10,
                        paddingTop: 10,
                        paddingBottom: 10,
                        paddingLeft: 20,
                        paddingRight: 20,
                      }}
                      onPress={() => setDetail(!detail)}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontWeight: "500",
                          color: "blue",
                        }}
                      >
                        Đã hiểu
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
          </View>
        </Modal>
      );
    }
  };
  
  return (
    <View style={{backgroundColor:' rgba(0, 236, 255, 1)', width:'100%', height:'100%'}}>
      <View style={{backgroundColor:'rgba(0, 0, 0, 0.2)', width:'100%', height:'100%'}}>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 30,
          padding: 20,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity onPress={() => goBack()}>
          <Back color={"black"} />
        </TouchableOpacity>
        <View style={{ paddingRight: 30 }}>
          <Text style={{ fontSize: 35 }}>Cây trồng</Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            display: "flex",
            padding: 20,
            gap: 25,
            justifyContent:'center',
            overflow: "hidden",
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        >
          {data.map((tree:any) => (
            <View style={{ display: "flex",borderRadius:10, width:'46%'}}
            key={tree.id}>
            <TouchableOpacity
             
             style={{
              
               justifyContent: "center",
               alignItems: "center",           
               gap: 15,
               
               borderColor: "black",
              
               padding: 15,
               
             }}
             onPress={() => {
               setDetail(true), setId(tree.id);
             }}
           >
             <Image source={Images[tree.img]} style={{ width: 100, height: 110, borderRadius:10, borderColor:'white', borderWidth:1 }} />
             <Text style={{fontSize:20, color:'white', textAlign:'center'}}>{tree.name}</Text>
           </TouchableOpacity>
            </View>
          ))}
        </View>
        {data.map((tree:any) => modal(tree))}
      </ScrollView>
      </View>
    </View>
  );
}
