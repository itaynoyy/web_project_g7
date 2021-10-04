
exports.GetBasicPageData = (session)=>{
	return {current_user:session.user, email:session.remember_me};
};