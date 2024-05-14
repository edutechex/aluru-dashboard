export interface Contact_us {
    id : number
    name : string
    mailID : string
    yourMessage	: string
    date: Date
  }

 export interface visitors_Data{
  id : number
  iPaddress : string
  city : string
  region : string
  post_code : number
  country : string
  date: Date
 } 
export interface editNavItem{
  id : number
  navbarName : string
  navbarSubName : string
  routerLink : string
}
export interface addNavItem{
  navbarName : string
  navbarSubName : string
  routerLink : string
}
export interface editHomeImage{
  id : number
  text : string
  imageFile : string
  order : number
  colour : string
}
export interface addHomeImage{
  text : string
  imageFile : string
  order : number
  colour : string
}
export interface editAboutUs{
  id : number
  imageFile : string
  content : string
}
export interface addAboutUs{
  imageFile : string
  content : string
}

export interface editTeam{
  id : number
  name : string
  imageFile : string
  designation : string
  about : string
  link : string
}

export interface addTeam{
  name : string
  imageFile : string
  designation : string
  about : string
  link : string
}

export interface editBlogNews{
  id : number
  imageFile : string
  content : string
  link : string
}
export interface addBlogNews{
  imageFile : string
  content : string
  link : string
}

export interface editOffering{
  id : number
  title : string
  imageFile : string
  content : string
}

export interface addOffering{
  title : string
  imageFile : string
  content : string
}

export interface editJoinUs{
  id : number
  content : string
}

export interface addJoinUs{
  content : string
}
export interface editCfrp{
  id : number
  content : string
}
export interface addCfrp{
  content : string
}