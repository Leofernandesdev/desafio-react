import React from 'react';
import userPhoto from '../assets/sombra-desafio.png'; 

const ProfileCard = () => {
  return (
    <aside className="w-full lg:w-[460px] lg:max-w-[460px] h-[439px] flex-shrink-0 rounded-2xl">
      <div className="bg-white rounded-2xl shadow-lg p-4 h-full flex flex-col">
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-gray-600 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In suscipit
            suscipit porttitor. Suspendisse ex lorem, rhoncus nec ante eu,
            venenatis aliquam turpis. Nulla facilisi. Curabitur nec mattis
            dolor. Nulla finibus bibendum ligula tempus vehicula. Ut at
            tristique libero, nec efficitur dui. Aliquam erat volutpat. Fusce
            quam sem, tempus nec justo eget, luctus scelerisque velit. Nam
            sollicitudin purus urna, vitae ornare neque tincidunt vel. Proin ac
            lacinia erat, et commodo felis. Phasellus tempor tellus eu vulputate
            tempus.
          </p>
        </div>
        <div className="flex-grow flex items-center justify-start">
          <img
            src={userPhoto} 
            alt="Foto do usuário"
            className="w-[142px] h-[159px] object-cover rounded-lg"
          />
        </div>
      </div>
    </aside>
  );
};

export default ProfileCard;