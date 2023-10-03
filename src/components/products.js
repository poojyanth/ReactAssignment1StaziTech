import { useState } from 'react';

export function Products(props) {

   const [isLiked, setIsLiked] = useState(false);

 const toggleLike = () => {
   setIsLiked((prevState) => !prevState);
 };

    return(
        <div className='productList'>
            <div key={props.id} className='productCard'>
                <img src={props.image} alt='product-img' className='productImage'></img>


                <div className='productCard__content'>
                   <div className='productCard__content__top'>
                       <h3 className='productName'>{props.name}</h3>
                       <div className='productYear'>{props.year}</div>
                   </div>
                    
                    <div className='displayStack__1'>
                        <div className='productPrice'>
                           <i class="icon fi fi-sr-users"></i>
                           {props.people} people</div>
                        <div className='productSales'>
                           <i class="icon fi fi-rs-gas-pump-alt"></i>
                           {props.fueltype}
                       </div>
                    </div>
                    <div className='displayStack__2'>
                        <div className='mileage'>
                           <i class="icon fi fi-rr-dashboard"></i>
                           <div className='productRating'>{props.mileage}</div>
                        </div>
                        <div className='driveType'>
                           <i class="icon fi fi-bs-steering-wheel"></i>
                        <div className='productTime'>{props.drivetype}</div>
                        </div>
                        
                    </div>
                    <hr></hr>
                    <div className='displayStack__3'>
                       <div className='rentAmount'>${props.price} / month</div>
                       <div className='rentLikeButtons'>
                           <i name="likebutton" className={`like fi ${isLiked ? 'fi-sr-heart' : 'fi-rs-heart'}`} onClick={toggleLike}></i>
                           <div className='rentButton'><button className='rentnow'>Rent Now</button></div>
                       </div>
                   </div>
                </div>
            </div>
        </div>
    )
}   