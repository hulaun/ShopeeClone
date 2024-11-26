import { useRef, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { useAuth } from '../../../../../context/AuthContext';
import { privatePost } from '../../../../../utils/httpRequest';

function MainProfile() {
  const imageRef = useRef();
  const [image, setImage] = useState({});
  const { currentUser } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data, event) => {
    event.preventDefault();
    console.log("tell me why",{
      profilePicture: image,
      ...data
    });

    // You can now send data to your server using fetch or axios
    const updateUser = async()=>{
      const status = await privatePost("/user/"+currentUser.id, {
        profilePicture: image,
        ...data
      })
      console.log(status);
    }
    updateUser();
  };

  const handleImageChange= (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  }
  

  return ( <div className="p-1 px-4">
    <section className="border border-white border-b-grey-200 pb-4">
      <h2 className="text-xl">Hồ sơ của tôi</h2>
      <label>Quản lý thông tin hồ sơ để bảo mật tài khoản</label>
    </section>
    <section className="pt-8 flex justify-between">
      <section className='w-full pr-4'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2 w-full items-center">
              <label className='basis-1/4 text-right text-grey-500' htmlFor="username">Tên đăng nhập</label>
              <input className='w-full px-3 border border-grey-300 p-2' value={currentUser?currentUser.username:"None"} type="text" {...register('username', { required: true })} />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="flex gap-2 w-full items-center">
              <label className='basis-1/4 text-right text-grey-500' htmlFor="fullname">Tên</label>
              <input className='w-full px-3 border border-grey-300 p-2' value={currentUser?currentUser.fullName:"None"} type="text" {...register('fullname', { required: true })} />
              {errors.name && <span>This field is required</span>}
            </div>
            <div className="flex gap-2 w-full items-center">
              <label className='basis-1/4 text-right text-grey-500' htmlFor="email">Email</label>
              <input className='w-full px-3 border border-grey-300 p-2' value={currentUser?currentUser.email:"None"} type="email" {...register('email', { required: true })} />
              {errors.email && <span>This field is required</span>}
            </div>
            <div className="flex gap-2 w-full items-center">
              <label className='basis-1/4 text-right text-grey-500' htmlFor="phone">Số điện thoại</label>
              <input className='w-full px-3 border border-grey-300 p-2' value={currentUser?currentUser.phoneNumber:"None"} type="text" {...register('phone', { required: true })} />
              {errors.phone && <span>This field is required</span>}
            </div>
            <div className="flex gap-2 w-full items-center">
              <label className='basis-1/4 text-right text-grey-500'>Giới tính</label>
              <div className='w-full flex gap-3 px-3'>
                <div className='flex gap-1'>
                  <input type="radio" value="Male" {...register('gender',)} />
                  <label htmlFor="gender">Nam</label>
                </div>
                <div className='flex gap-1'>
                  <input type="radio" value="Female" {...register('gender',)} />
                  <label htmlFor="gender">Nữ</label>
                </div>
                <div className='flex gap-1'>
                  <input type="radio" value="Other" {...register('gender',)} />
                  <label htmlFor="gender">Khác</label>
                </div>
              </div>
              {errors.phone && <span>This field is required</span>}
            </div>
            <div className="flex gap-2 w-full items-center">
              <label className='basis-1/4 text-right text-grey-500' htmlFor="dob">Ngày sinh</label>
              <input className='w-full px-3 border border-grey-300 p-2' type="date" {...register('dob',)} />
              {errors.phone && <span>This field is required</span>}
            </div>
            <div className='flex gap-2 w-full items-center'>
              <label className='basis-1/4'></label>
              <div className='w-full'>
                <button type='submit' className='bg-primary p-2 px-3 text-white' >Submit</button>
              </div>
            </div>
          </div>
        </form>
      </section>
      <section className="basis-1/4">
        <div className='flex flex-col items-center border border-white border-l-grey-200 p-2'>
          <img src="https://picsum.photos/100/100" alt="" className="rounded-full size-24" />
          <input ref={imageRef} type="file" name="avatar" id="avatar" accept='.jpg,.jpeg,.png' className="hidden" onChange={handleImageChange}/>
          <button className='p-2 px-3 border border-grey-300 mt-2 text-grey-600' onClick={()=>imageRef.current.click()}>Chọn ảnh</button>
          <p className='text-grey-600 pt-2'>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</p>
        </div>
      </section>
    </section>
  </div> );
}

export default MainProfile;