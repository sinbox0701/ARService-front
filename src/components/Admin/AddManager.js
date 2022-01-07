import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import routes from "../../routes";
import FormBox from "../auth/FormBox";
import FormError from "../auth/FormError";
import { Input, SearchSubmitbutton } from "../shared";

const CREATE_MANAGER = gql`
    mutation createManager($nickname:String! $password:String!){
        createManager(nickname:$nickname password:$password){
            ok
            error
        }
    }
`;

const AddManager = () => {
    const history = useHistory();
    const {register,handleSubmit,errors,formState,setError,clearErrors,getValues} = useForm({
        mode:"onChange",
    });
    const onCompleted = (data) => {
        const {
            createManager: {ok,error}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }
        alert("계정 생성 완료!");
    };
    const [createManager,{loading}] = useMutation(CREATE_MANAGER,{onCompleted});
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {nickname,password} = getValues();
        createManager({
            variables:{
                nickname,
                password
            }
        });
    };
    const clearAddManagerError = () => {
        clearErrors("result");
    }
    return (
        <FormBox>
            <form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
                ref={register({
                    required:"매니저 이름을 입력해주세요!",
                })} 
                onChange={() => clearAddManagerError()}
                name="nickname"
                hasError={Boolean(errors?.nickname?.message)}
                type="text" 
                placeholder="매니저 명"
            />
            <FormError message={errors?.nickname?.message}/>
            <Input
                ref={register({
                    required:"비밀번호를 입력해주세요!",
                    minLength:{
                        value:6,
                        message:"6자리 이상 입력하셔야합니다!"
                    }
                })} 
                onChange={() => clearAddManagerError()}
                name="password"
                hasError={Boolean(errors?.password?.message)}
                type="password" 
                placeholder="비밀번호"
            />
            <FormError message={errors?.password?.message}/>
            <br/>
            <SearchSubmitbutton type="submit" value="등록"/>
            <FormError message={errors?.result?.message}/>
            </form>
        </FormBox>
    );
}

export default AddManager;