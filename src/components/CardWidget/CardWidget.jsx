import './CardWidget.css'
import { useCart } from "../../hooks/useCart";
import { Link } from "react-router-dom";
function CardWidget(){

	const {totalQuantity} = useCart();
    return(
        <Link className="nav-link d-flex" to="/cart">
            <svg
	 width="40" 
     height="40" 
     viewBox="0 0 485.196 485.196" 
     style={{ enableBackground: "new 0 0 485.196 485.196" }}
	 >

			<polygon points="424.543,318.405 172.047,318.405 65.892,75.806 0,75.806 0,45.479 85.736,45.479 191.892,288.084 
				424.543,288.084 			"/>

		<path d="M272.919,394.227c0,25.109-20.376,45.49-45.49,45.49c-25.113,0-45.49-20.381-45.49-45.49
			c0-25.117,20.376-45.489,45.49-45.489C252.543,348.737,272.919,369.109,272.919,394.227z"/>
		<path d="M424.543,394.227c0,25.109-20.372,45.49-45.485,45.49s-45.49-20.381-45.49-45.49c0-25.117,20.377-45.489,45.49-45.489
			S424.543,369.109,424.543,394.227z"/>

			<polygon points="473.053,136.457 485.196,106.131 151.628,106.131 163.756,136.457 			"/>
			<polygon points="200.138,227.435 212.266,257.762 424.543,257.762 436.687,227.435 			"/>
			<polygon points="460.941,166.784 175.883,166.784 188.011,197.108 448.798,197.108 			"/>

			</svg>
<div className="fondoNum">
	{totalQuantity}
</div>

        </Link>
    )
}
export default CardWidget