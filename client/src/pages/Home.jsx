import { useSelector } from 'react-redux';
import LandingPage from './LandingPage';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Home() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) navigate('/expenses');
  }, []);

  return currentUser ? null : <LandingPage />;
}
