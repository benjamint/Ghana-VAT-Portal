'use client';

export default function FontStyles() {
  return (
    <style jsx global>{`
      @font-face {
        font-family: 'SF Pro Display';
        src: local('SF Pro Display'),
             local('-apple-system'),
             local('BlinkMacSystemFont'),
             local('Segoe UI'),
             local('Roboto'),
             local('Oxygen-Sans'),
             local('Ubuntu'),
             local('Cantarell'),
             local('Helvetica Neue'),
             local('sans-serif');
        font-weight: 400;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'SF Pro Display';
        src: local('SF Pro Display'),
             local('-apple-system'),
             local('BlinkMacSystemFont'),
             local('Segoe UI'),
             local('Roboto'),
             local('Oxygen-Sans'),
             local('Ubuntu'),
             local('Cantarell'),
             local('Helvetica Neue'),
             local('sans-serif');
        font-weight: 500;
        font-style: normal;
      }
      
      @font-face {
        font-family: 'SF Pro Display';
        src: local('SF Pro Display'),
             local('-apple-system'),
             local('BlinkMacSystemFont'),
             local('Segoe UI'),
             local('Roboto'),
             local('Oxygen-Sans'),
             local('Ubuntu'),
             local('Cantarell'),
             local('Helvetica Neue'),
             local('sans-serif');
        font-weight: 600;
        font-style: normal;
      }
    `}</style>
  );
} 