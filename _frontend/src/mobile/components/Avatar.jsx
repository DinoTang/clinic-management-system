import femaleAvatar from "../../assets/Female Avatar.png";
import femaleDoctorAvatar from "../../assets/Female Doctor Avatar.png";
import maleAvatar from "../../assets/Male Avatar.png";
import maleDoctorAvatar from "../../assets/Male Doctor Avatar.png";

function getGender(gender) {
  const normalizedGender = String(gender || "")
    .trim()
    .toLowerCase();

  if (["female", "f", "woman", "nu", "nữ"].includes(normalizedGender)) {
    return "female";
  }

  return "male";
}

function Avatar({ gender, type = "patient", className = "" }) {
  const isFemale = getGender(gender) === "female";
  const isDoctor = type === "doctor";
  const avatar = isDoctor
    ? isFemale
      ? femaleDoctorAvatar
      : maleDoctorAvatar
    : isFemale
      ? femaleAvatar
      : maleAvatar;

  return <img className={className} src={avatar} alt="" />;
}

export default Avatar;
