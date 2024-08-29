// api ->回傳該表單的預設站點資訊
// function 帶入站點總站數 第n站 每站簽核人 職位

// 动态生成一个 form-reassign-station 并添加到父容器

/*
 api 回傳學校組織
 使用第一筆處室作為預設
 回傳 該處室的人員名單填入人員列表
*/
import { get } from "./net/request.js";

const departments = [
  { value: "FIN", label: "財務室" },
  { value: "PUR", label: "採購室" },
  { value: "PER", label: "人事室" }
];

const persons = [
  { id: "pur10012", name: "人員A" },
  { id: "pur54451", name: "人員B" },
  { id: "fin65487", name: "人員C" }
];

const formInit = [
  { index: "1", jobtitle: "二級專員", name: "王治中" },
  { index: "2", jobtitle: "一級專員", name: "林愈停" },
  { index: "3", jobtitle: "主任秘書", name: "陳詩涵" }
];

let formSection = document.getElementsByClassName("form-reassign-sign")[0];
/*
 *動態創建
 */
function createReassignStation(
  stationNumber,
  position,
  name,
  departments,
  persons
) {
  //創建 form-reassign-station
  const stationDiv = document.createElement("div");
  stationDiv.className = "form-reassign-station";

  // 创建和添加 form-item 元素
  const itemNumber = document.createElement("div");
  itemNumber.className = "form-item";
  itemNumber.textContent = stationNumber;
  stationDiv.appendChild(itemNumber);

  const itemPosition = document.createElement("div");
  itemPosition.className = "form-item";
  itemPosition.textContent = position;
  stationDiv.appendChild(itemPosition);

  const itemName = document.createElement("div");
  itemName.className = "form-item";
  itemName.textContent = name;
  stationDiv.appendChild(itemName);

  const departmentSelect = document.createElement("select");
  departmentSelect.className = "form-item form-reassign-department";
  departments.forEach((item) => {
    const department = document.createElement("option");
    department.value = item.value;
    department.textContent = item.label;
    departmentSelect.appendChild(department);
  });
  stationDiv.appendChild(departmentSelect);

  // 创建和添加人员 select 元素
  const personSelect = document.createElement("select");
  personSelect.className = "form-item form-reassign-person";
  persons.forEach((person) => {
    const option = document.createElement("option");
    option.value = person.id;
    option.textContent = person.name;
    personSelect.appendChild(option);
  });
  stationDiv.appendChild(personSelect);

  // 创建和添加重新指定按钮
  const reassignButton = document.createElement("div");
  reassignButton.className = "form-reasign-button form-item";
  reassignButton.textContent = "重新指定";
  stationDiv.appendChild(reassignButton);

  return stationDiv;
}

formInit.forEach((element) => {
  const newStation = createReassignStation(
    element.index,
    element.jobtitle,
    element.name,
    departments,
    persons
  );
  formSection.appendChild(newStation);
});

const formId = "123"; // 假设formId是123
get(`api/v1/forms/formId?formId=${formId}`, (data) => {
  console.log("getsuccess", data);
  data.forEach((element) => {
    const newStation = createReassignStation(
      element.index,
      element.jobtitle,
      element.name,
      departments,
      persons
    );
    formSection.appendChild(newStation);
  });
});
