import React, { useRef, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../../../context/AuthContext';
import { privateGet, privatePatch, privatePost } from '../../../../../utils/httpRequest';
import axios from 'axios';

function MainProfile() {
  const imageRef = useRef();
  const [newImage, setNewImage] = useState(null);
  const { currentUser } = useAuth();
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await privateGet("/user/profile/" + currentUser.id);
      // Set form values
      setValue('name', response.data.data.fullName || '');
      setValue('email', response.data.data.email || '');
      setValue('phone', response.data.data.phoneNumber || '');
      setValue('address', response.data.data.address || '');
      setValue('gender', response.data.data.gender || '');
      setValue('dob', response.data.data.dob || '');
    };
    fetchUserProfile();
  }, [currentUser.id, setValue]);

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('profilePicture', newImage);
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
    formData.append('address', data.address);
    formData.append('dob', data.dob);
    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    // console.log('Data:', fs.createReadStream(newImage));
    const updateUser = async () => {
      await privatePost("/user/" + currentUser.id, {
        formData,
      },headers={
        'Content-Type': 'multipart/form-data'
      });
      // axios.post(process.env.REACT_APP_SERVER_ENDPOINT + "/user/" + currentUser.id, formData, {headers:{
      //   'Content-Type': 'multipart/form-data'
      // }})
      // console.log(status);
    };
    updateUser();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setNewImage(file);
      console.log('New image selected:', file);
    }
  };

  return (
    <div className="p-1 px-4">
      <section className="border border-white border-b-grey-200 pb-4">
        <h2 className="text-xl">Hồ sơ của tôi</h2>
        <label>Quản lý thông tin hồ sơ để bảo mật tài khoản</label>
      </section>
      <section className="pt-8 flex justify-between">
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
              <div className="flex gap-2">
                <label htmlFor="name">Họ và tên</label>
                <input type="text" {...register('name', { required: true })} />
                {errors.name && <span>This field is required</span>}
              </div>
              <div className="flex gap-2">
                <label htmlFor="email">Email</label>
                <input type="email" {...register('email', { required: true })} />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="flex gap-2">
                <label htmlFor="phone">Số điện thoại</label>
                <input type="text" {...register('phone', { required: true })} />
                {errors.phone && <span>This field is required</span>}
              </div>
              <div className="flex gap-2">
                <label htmlFor="address">Địa chỉ</label>
                <input type="text" {...register('address', { required: true })} />
                {errors.address && <span>This field is required</span>}
              </div>
              <div className="flex gap-2 w-full items-center">
                <label className='basis-1/4 text-right text-grey-500'>Giới tính</label>
                <div className='w-full flex gap-3 px-3'>
                  <div className='flex gap-1'>
                    <input type="radio" value="M" {...register('gender', { required: true })} />
                    <label htmlFor="gender">Nam</label>
                  </div>
                  <div className='flex gap-1'>
                    <input type="radio" value="F" {...register('gender', { required: true })} />
                    <label htmlFor="gender">Nữ</label>
                  </div>
                  <div className='flex gap-1'>
                    <input type="radio" value="O" {...register('gender', { required: true })} />
                    <label htmlFor="gender">Khác</label>
                  </div>
                </div>
                {errors.gender && <span>This field is required</span>}
              </div>
              <div className="flex gap-2 w-full items-center">
                <label className='basis-1/4 text-right text-grey-500' htmlFor="dob">Ngày sinh</label>
                <input className='w-full px-3 border border-grey-300 p-2' type="date" {...register('dob', { required: true })} />
                {errors.dob && <span>This field is required</span>}
              </div>
              <div className='flex gap-2 w-full items-center'>
                <label className='basis-1/4'></label>
                <div className='w-full'>
                  <button type="submit" className='bg-primary p-2 px-3 text-white'>Submit</button>
                </div>
              </div>
            </div>
          </form>
        </section>
        <section className="basis-1/4">
          <div className='flex flex-col items-center border border-white border-l-grey-200 p-2'>
            <img src={newImage ? URL.createObjectURL(newImage) : "https://picsum.photos/100/100"} alt="" className="rounded-full size-24" />
            <input ref={imageRef} type="file" name="avatar" id="avatar" accept='.jpg,.jpeg,.png' className="hidden" onChange={handleImageChange} />
            <button className='p-2 px-3 border border-grey-300 mt-2 text-grey-600' onClick={() => imageRef.current.click()}>Chọn ảnh</button>
            <p className='text-grey-600 pt-2'>Dụng lượng file tối đa 1 MB Định dạng:.JPEG, .PNG</p>
          </div>
        </section>
      </section>
    </div>
  );
}

export default MainProfile;