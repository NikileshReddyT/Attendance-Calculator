function calculateAttendance() {
  const desiredPercentage = parseFloat(
    document.getElementById("desiredPercentage").value
  );
  const conductedClasses = document
    .getElementById("conductedClasses")
    .value.split(" ")
    .map(Number);
  const attendedClasses = document
    .getElementById("attendedClasses")
    .value.split(" ")
    .map(Number);

  // Validation checks
  if (
    isNaN(desiredPercentage) ||
    desiredPercentage < 0 ||
    desiredPercentage > 100
  ) {
    document.getElementById("result").innerText =
      "Please enter a valid desired percentage (0-100).";
    return;
  }

  const totalConducted = conductedClasses.reduce((acc, cur) => acc + cur, 0);
  const totalAttended = attendedClasses.reduce((acc, cur) => acc + cur, 0);

  if (totalAttended > totalConducted) {
    document.getElementById("result").innerText =
      "Attended classes cannot exceed conducted classes. Please check the details.";
    return;
  }

  let presentPercentage = parseFloat(
    ((totalAttended / totalConducted) * 100).toFixed(2)
  );
  const initialPercentage = presentPercentage;
  let x = 0;
  let y = 0;
  let numerator, denominator;

  // Calculate the number of additional classes needed to achieve the desired percentage
  while (presentPercentage < desiredPercentage) {
    x++;
    presentPercentage = parseFloat(
      (((totalAttended + x) / (totalConducted + x)) * 100).toFixed(2)
    );
  }

  numerator = totalAttended + x;
  denominator = totalConducted + x;

  // Reset presentPercentage to the initial value
  presentPercentage = initialPercentage;

  // Calculate the number of classes that can be missed while maintaining the desired percentage
  while (presentPercentage > desiredPercentage) {
    const tempPercentage = parseFloat(
      ((totalAttended / (totalConducted + (y + 1))) * 100).toFixed(2)
    );
    if (tempPercentage < desiredPercentage) {
      break;
    }
    presentPercentage = tempPercentage;
    y++;
  }

  // Formatting the result message
  let resultMessage = `Your current percentage =<span class="percentage">${initialPercentage}%</span>(${totalAttended} / ${totalConducted}).<br><br>`;

  if (initialPercentage === desiredPercentage) {
    resultMessage += `You have the correct percentage of <span class="percentage">${desiredPercentage}%</span>. Please maintain this.`;
  } else if (x > 0) {
    resultMessage += `To achieve <span class="important-info">${desiredPercentage}%</span>, you need to <span class="class-count">Attend ${x} More Classes (50 min)</span>.<br><br>After attending <span class="class-count">${x} Classes</span>, your percentage will be<span class="percentage">${parseFloat(
      ((numerator / denominator) * 100).toFixed(2)
    )}%</span> (${numerator} / ${denominator}).`;
  } else if (y > 0) {
    resultMessage += `You can <span class="class-count">Bunk ${y} More Classes (50 min)</span> and still maintain a percentage of <span class="important-info">${desiredPercentage}%</span>.<br><br>After missing <span class="class-count">${y} Classes</span>, your percentage will be<span class="percentage">${parseFloat(
      ((totalAttended / (totalConducted + y)) * 100).toFixed(2)
    )}%</span> (${totalAttended} / ${totalConducted + y}).`;
  } else {
    resultMessage += `No further action is required to meet the desired percentage.`;
  }

  document.getElementById("result").innerHTML = resultMessage;
}
