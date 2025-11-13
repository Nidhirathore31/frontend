// 'use client';

// import { useSelector, useDispatch } from 'react-redux';
// import { removeFromCart, clearCart } from '@/app/redux/slice/cartSlice';

// const CartModal = ({ onClose }) => {
//   const cartItems = useSelector((state) => state.cart.items);
//   const dispatch = useDispatch();
//    console.log(cartItems,"cart items")
//   return (
//     <div style={{
//       position: 'fixed',
//       top: '50%',
//       left: '50%',
//       transform: 'translate(-50%, -50%)',
//       width: '90%',
//       maxWidth: '400px',
//       background: '#fff',
//       border: '1px solid #ccc',
//       padding: '20px',
//       zIndex: 9999,
//       boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
//       borderRadius: '12px',
//       fontFamily: 'Arial, sans-serif',
//     }}>
//       <h4 style={{
//         marginBottom: '20px',
//         display: 'flex',
//         alignItems: 'center',
//         gap: '8px',
//         justifyContent: 'center',
//         textAlign: 'center',
//       }}>
//         🛒 <span>Your Cart</span>
//       </h4>

//       {cartItems.length === 0 ? (
//         <p style={{ textAlign: 'center', color: '#777' }}>No items yet</p>
//       ) : (
//         <>
//           <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
//             {cartItems.map((item) => (
//               <li key={item._id} style={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 marginBottom: '15px',
//                 borderBottom: '1px solid #eee',
//                 paddingBottom: '10px'
//               }}>
//                 <img
//                   src={`http://localhost:3001/${item.image}`}
//                   alt={item.title}
//                   onError={(e) => { e.target.src = '/placeholder.jpg'; }}
//                   style={{
//                     width: '60px',
//                     height: '60px',
//                     objectFit: 'cover',
//                     borderRadius: '6px',
//                     marginRight: '10px',
//                     border: '1px solid #ddd',
//                   }}
//                 />
//                 <div style={{ flexGrow: 1 }}>
//                   <strong style={{ fontSize: '15px' }}>{item.title}</strong>
//                   <div style={{ fontSize: '14px', color: '#555' }}>
//                     ₹{item.price} x {item.quantity}
//                   </div>
//                 </div>
//                 <button
//                   onClick={() => dispatch(removeFromCart(item._id))}
//                   style={{
//                     border: 'none',
//                     background: 'transparent',
//                     color: '#ff4d4f',
//                     cursor: 'pointer',
//                     fontSize: '18px',
//                   }}
//                   aria-label="Remove item"
//                 >
//                   ×
//                 </button>
//               </li>
//             ))}
//           </ul>

//           <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px', textAlign: 'right' }}>
//             Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
//           </div>

//           <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
//             <button
//               onClick={() => dispatch(clearCart())}
//               style={{
//                 flex: 1,
//                 backgroundColor: '#dc3545',
//                 color: '#fff',
//                 border: 'none',
//                 padding: '8px 0',
//                 borderRadius: '6px',
//                 cursor: 'pointer'
//               }}
//             >
//               Clear All
//             </button>
//             <button
//               onClick={onClose}
//               style={{
//                 flex: 1,
//                 backgroundColor: '#6c757d',
//                 color: '#fff',
//                 border: 'none',
//                 padding: '8px 0',
//                 borderRadius: '6px',
//                 cursor: 'pointer'
//               }}
//             >
//               Close
//             </button>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartModal;



'use client';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCartAPI, removeFromCart, clearCart } from '@/app/redux/slice/cartSlice';

const CartModal = ({ onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const { status, error } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartAPI()); // Fetch cart data when the modal is opened
  }, [dispatch]);

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '90%',
      maxWidth: '400px',
      background: '#fff',
      border: '1px solid #ccc',
      padding: '20px',
      zIndex: 9999,
      boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
      borderRadius: '12px',
      fontFamily: 'Arial, sans-serif',
    }}>
      <h4 style={{
        marginBottom: '20px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        justifyContent: 'center',
        textAlign: 'center',
      }}>
        🛒 <span>Your Cart</span>
      </h4>

      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p style={{ color: 'red' }}>Error: {error}</p>}
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No items yet</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0, maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
            {cartItems.map((item) => (
              <li 
              key={item._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '15px',
                borderBottom: '1px solid #eee',
                paddingBottom: '10px'
              }}>
                <img
                  src={`http://localhost:3001/${item.image}`}
                  alt={item.name}
                  onError={(e) => { e.target.src = '/placeholder.jpg'; }}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                    marginRight: '10px',
                    border: '1px solid #ddd',
                  }}
                />
                <div style={{ flexGrow: 1 }}>
                  <strong style={{ fontSize: '15px' }}>{item.name}</strong>
                  <div style={{ fontSize: '14px', color: '#555' }}>
                    ₹{item.price} x {item.quantity}
                  </div>
                </div>
                <button
                  onClick={() => dispatch(removeFromCart(item.productId))}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: 'red',
                    cursor: 'pointer',
                    fontSize: '18px',
                  }}
                  aria-label="Remove item"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>

          <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '15px', textAlign: 'right' }}>
            Total: ₹{cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
            <button
              onClick={() => dispatch(clearCart())}
              style={{
                flex: 1,
                backgroundColor: '#dc3545',
                color: '#fff',
                border: 'none',
                padding: '8px 0',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              style={{
                flex: 1,
                backgroundColor: '#6c757d',
                color: '#fff',
                border: 'none',
                padding: '8px 0',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartModal;

