import Container from '../components/Container'
import { Rating } from '../components/Store'
import { useParams } from 'react-router'
import { addToCartList, getCookie, getProductById } from '../util/functions'
import { useMutation, useQuery } from 'react-query'
import { Button } from '../components/Button'
import jwtDecode from 'jwt-decode'
import { toast } from 'react-toastify'

const ProductPage = () => {
    const {id} = useParams();
    const { data: product, isLoading: isProductLoading} = useQuery(['product', id], () => getProductById(id) ,{
        enabled: id !== "",
    });

    // mutatation for add to cart list

    const addToCartMutation = useMutation((payload) => addToCartList(payload),{
        onSuccess: (data) => {
            console.log(data);
            toast.success('product added to cart');
        },
        onError: (error) => {
            console.log(error);
        }
    });

    const addToCart = async (id) => {
        try {
            const currentDate = new Date();
            const year = currentDate.getFullYear();
            const month = String(currentDate.getMonth() + 1).padStart(2, '0'); 
            const day = String(currentDate.getDate()).padStart(2, '0');

            const formattedDate = `${year}-${month}-${day}`;
            const token = getCookie('token');
            const decoded = jwtDecode(token);

            const payload = {
                userId: decoded.sub,
                date: formattedDate,
                products: [{productId: id, quantity: 1}]
            };
            await addToCartMutation.mutateAsync(payload);
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <div className="w-full py-20">
        <Container>
            <div className="min-h-80 bg-slate-400/20 backdrop-blur-[30px] rounded-3xl py-10 md:py-5 px-10 flex flex-col md:flex-row gap-5">
                {
                    isProductLoading ? (
                        <>
                            <div className="w-full h-40 bg-gray-300/20 animate-pulse p-5"></div>
                            <div className="">
                            {
                                Array.from({ length: 4 }, (_, index) => (
                                    <div
                                    key={`loading_${index}`}
                                    className="bg-gray-300/20 animate-pulse w-full p-5 rounded-full"
                                    ></div>
                                ))
                            }
                            </div>
                        </>
                    ):(
                        <>
                            <img src={product?.image} className="w-full h-40" alt={product?.title} />
                            <div className=" text-left">
                                <span className=" text-xl capitalize text-gray-500">{product?.category}</span>
                                <span className="text-3xl font-semibold text-primary block cursor-auto my-3">${product?.price}</span>
                                <div className="mb-5">
                                    <h1 className="text-[2rem] text-neutral font-bold ">{product?.title}</h1>
                                    <Rating rating={product?.rating}/>
                                </div>
                                <p className="mb-10">{product?.description}</p>
                                <Button onClick={() => addToCart(product?.id)} loading={addToCartMutation.isLoading}>Add to Cart</Button>
                            </div>
                        </>
                    )
                }
            </div>
        </Container>
    </div>
  )
}

export default ProductPage