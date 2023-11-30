'use client'


import dynamic from 'next/dynamic';


const MapWithNoSSR = dynamic(() => import('../../components/map/map'), {
  ssr: false
});

const MyPage = () => {
  return (
    <div>
      <h1>Mapa de Localización</h1>
      <MapWithNoSSR address="Balcarce 50" />
    </div>
  );
};

export default MyPage;