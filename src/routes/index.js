
import { CourseCreate, CourseUpdate } from "../features/Admin/components/Course"
import { EduCreate } from "../features/Admin/components/Edu/EduCreate"
import { UserRoleCreate } from "../features/Admin/components/UserRole"
import { ClassPage, CoursePage, EduPage, LoginPage, ModulePage, RegisterPage, User, UserRolePage } from "../features/Admin/pages"
import { TeacherPage } from "../features/Admin/pages/TeacherPage"


// public routes
const publicRoutes = [
    { path: '/', component: UserRolePage },
    { path: '/role/*', component: UserRolePage },
    // { path: '/education', component: EduPage },

    { path: '/education/*', component: EduPage },



    { path: '/user', component: User },
    { path: '/createUserRole', component: UserRoleCreate },
    { path: '/updateUserRole', component: UserRoleCreate },

    { path: '/createEdu', component: EduCreate },
    { path: '/updateEdu?/*', component: EduCreate },

    { path: '/courses', component: CoursePage },
    { path: '/createCourse', component: CourseCreate },
    { path: '/updateCourse', component: CourseUpdate },
    { path: '/class', component: ClassPage },

    { path: '/module', component: ModulePage },

    { path: '/dang-nhap', component: LoginPage },
    { path: '/dang-ki', component: RegisterPage },


    { path: '/teacher', component: TeacherPage },
    
 
]
export { publicRoutes }
