import { faEdit, faSpinner, faTrash, faPhone, faSignOutAlt, faEnvelope, faMapMarkerAlt} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";



const Icons = () => {
return library.add( faEdit, faTrash, faPhone, faSignOutAlt, faEnvelope, faMapMarkerAlt, faSpinner)
};

export default Icons;