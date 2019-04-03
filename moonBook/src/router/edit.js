import EditChild from "@/components/pages/editBaby/child";
import EditSchool from "@/components/pages/school";
import EditClass from "@/components/pages/class";
import EditStting from "@/components/pages/setting";
import EditManager from "@/components/pages/editManager/manager";

let editRouter = [
  {
    path: "/edit/child",
    name: "edit-child",
    component: EditChild,
    meta: {
      isFooterBar: false
    }
  },
  {
    path: "/edit/school",
    name: "edit-school",
    component: EditSchool,
    meta: {
      isFooterBar: false
    }
  },
  {
    path: "/edit/class",
    name: "edit-class",
    component: EditClass,
    meta: {
      isFooterBar: false
    }
  },
  {
    path: "/edit/setting",
    name: "edit-setting",
    component: EditStting,
    meta: {
      isFooterBar: false
    }
  },
  {
    path: "/edit/manager",
    name: "edit-manager",
    component: EditManager,
    meta: {
      isFooterBar: false
    }
  }
]

export default editRouter