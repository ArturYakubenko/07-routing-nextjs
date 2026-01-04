"use client"; 



interface ErrorProps {
  message: string;      
  error?: Error;         
  reset?: () => void;    
}

 const ErrorMessage = ({ message }: ErrorProps) => {
  return (
    <div className="error-style">
      {message}
    </div>
  );
};

export default ErrorMessage