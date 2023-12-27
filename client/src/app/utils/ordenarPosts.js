export const orderPosts = (publicaciones = []) => {
    return publicaciones.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
  
      return dateB - dateA;
    });
  };

  