<!--
{
	"title": "필요한 패키지 설치하기",
	"group": 1,
	"order": 5
}
-->

-----------------------

# 필요한 패키지 설치하기 #

-----------------------

**package.json**

	{
	  "jam": {
	    "baseUrl": "app",
	    "packageDir": "cornerstone",
	    "dependencies": {
	      "launcher": "*",
	      "template": "*",
	      "style": "*",
	      "bootstrap": "*",
	      "form-view": "*",
	      "validation-view": "*",
	      "multipage-router": "*"
	    }
	  }
	}

**필요한 패키지 일괄 설치**

	jam install
