'use strict';

module.exports = function (grunt) {
	var defaultStyle = "theme-dark";

	// grunt-*로 시작하는 모든 라이브러리 가져온다.
	require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

	// Project configuration.
	grunt.initConfig({
		config: {
			dist: './'
		},
		clean: {
			build: {
				src: [
					"assets/",
					"components/",
					"css/",
					"customize/",
					"examples/",
					"getting-started/",
					"javascript/",
					"dist/",
					"less/",
					"js/",
					"index.html"
				]
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						dot: true,
						cwd: '../../src/style/bootstrap3/_gh_pages/',
						dest: './',
						src: [
							'index.html',
							'**/*'
						]
					}
				]
			}
		},
		replace: {
			index: {
				src: ['index.html'],
				dest: 'index.html',
				replacements: [
					{
						from: '"/assets',
						to: '"assets'
					},
					{
						from: '"/dist',
						to: '"dist'
					},
					{
						from: 'href="/"',
						to: 'href="./"'
					}
				]
			},
			oneDepth: {
				src: ['**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: '"/assets',
						to: '"../assets'
					},
					{
						from: '"/dist',
						to: '"../dist'
					},
					{
						from: 'href="/"',
						to: 'href="../"'
					}
				]
			},
			navLinkReplace: {
				src: ['index.html'],
				overwrite: true,
				replacements: [
					{
						from: '"/getting-started',
						to: '"getting-started'
					},
					{
						from: '"/css',
						to: '"css'
					},
					{
						from: '"/components',
						to: '"components'
					},
					{
						from: '"/javascript',
						to: '"javascript'
					},
					{
						from: '"/customize',
						to: '"customize'
					}
				]
			},
			navLinkReplaceOneDepth: {
				src: ['**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: '"/getting-started',
						to: '"../getting-started'
					},
					{
						from: '"/css',
						to: '"../css'
					},
					{
						from: '"/components',
						to: '"../components'
					},
					{
						from: '"/javascript',
						to: '"../javascript'
					},
					{
						from: '"/customize',
						to: '"../customize'
					}
				]
			},
			changeTheme: {
				src: ['index.html', '**/index.html'],
				overwrite: true,
				replacements: [
					{
						from: 'dist/css/bootstrap.css" rel="stylesheet">',
						to: '../../grunt-dist/lib/bootstrap/css/bootstrap.css" rel="stylesheet">'
					}
				]
			},
			changeThemeRoot: {
				src: ['index.html'],
				overwrite: true,
				replacements: [
					{
						from: 'grunt-dist/lib/bootstrap/css/bootstrap.css" rel="stylesheet">',
						to: function (matchedWord, index, fullText, regexMatches) {
							console.log(defaultStyle, matchedWord, index, regexMatches);
							if (defaultStyle.match("skin-*")) {
								return 'grunt-dist/src/style/' + defaultStyle + '/cornerstone.css" rel="stylesheet">';
							} else {
								return 'grunt-dist/lib/bootstrap/css/bootstrap.css" rel="stylesheet"><link href="../../grunt-dist/src/style/' + defaultStyle + '/cornerstone.css" rel="stylesheet">';
							}
						}
					}
				]
			},
			changeThemeOneDepth: {
				src: [
					"assets/index.html",
					"components/index.html",
					"css/index.html",
					"customize/index.html",
					"getting-started/index.html",
					"javascript/index.html"
				],
				overwrite: true,
				replacements: [
					{
						from: 'grunt-dist/lib/bootstrap/css/bootstrap.css" rel="stylesheet">',
						to: function () {
							if (defaultStyle.match("skin-*")) {
								return 'grunt-dist/src/style/' + defaultStyle + '/cornerstone.css" rel="stylesheet">';
							} else {
								return 'grunt-dist/lib/bootstrap/css/bootstrap.css" rel="stylesheet"><link href="../../../grunt-dist/src/style/' + defaultStyle + '/cornerstone.css" rel="stylesheet">';
							}
						}
					}
				]
			}
		}
	});

	grunt.registerTask('theme', function (theme) {
		if (typeof theme === "string" && theme.match("theme-.*|skin-.*")) {
			defaultStyle = theme;
		}
		grunt.task.run(['clean', 'copy', 'replace']);
	});
	// Default task.
	grunt.registerTask('default', ['clean', 'copy', 'replace']);
};